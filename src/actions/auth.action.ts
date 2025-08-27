"use server";

import { IUserSignUp } from "@/interface/auth.interface";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
async function ensureDefaultClient(
  supabase: ReturnType<typeof createClient>,
  { client_email, client_name }: { client_email: string; client_name: string }
) {
  // Only need minimal fields; triggers & defaults will fill the rest.
  const { data: existing, error: existingErr } = await (await supabase)
    .from("clients")
    .select("id")
    .limit(1);

  if (existingErr) throw existingErr;
  if (existing && existing.length > 0) return existing[0];

  const { data, error } = await (
    await supabase
  )
    .from("clients")
    .insert({
      client_name,
      client_email,
      plan: "Free Trial", // allowed: Free Trial, 299k, 399k, 699k
      account_status: "active", // enum default is also fine
      language_mix: null,
      // user_id is set by the DB trigger from auth.uid()
    })
    .select("id")
    .single();

  if (error) throw error;
  return data;
}
export const signUpAction = async (payload: IUserSignUp) => {
  const supabase = await createClient();
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aideligate-dashboard-lilac.vercel.app";

  const redirectTo = `${BASE_URL}/verification`;

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,

    options: {
      emailRedirectTo: redirectTo,
      data: {
        display_name: payload.full_name,
        role: payload.role || "staff",
      },
    },
  });

  if (error) {
    return {
      error: error.message,
      status: error.status,
    };
  }

  if (data?.user?.identities?.length == 0) {
    return {
      error: "This email is already in use",
      status: 404,
    };
  }
  revalidatePath("/", "layout");
  return {
    data: data?.user,
    error: null,
    status: 200,
  };
};
export const signInAction = async ({ email, password }: { email: string; password: string }) => {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      error: error.message,
      status: error.status,
    };
  }
  return {
    data: data?.user,
    error: null,
    status: 200,
  };
};

export const verifyEmail = async (code: string) => {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return {
      error: error.message,
      status: error.status,
    };
  }

  try {
    await ensureDefaultClient(Promise.resolve(supabase), {
      client_email: data.user.email!,
      client_name: data.user.user_metadata.display_name || "N/A",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // Non-fatal for login, but log if you have telemetry
    console.error("ensureDefaultClient failed:", e?.message ?? e);
  }
  return {
    data: data?.user,
    error: null,
    status: 200,
  };
};

export const updateAccount = async (payload: Record<string, unknown>) => {
  const client = await createClient();
  const res = await client.auth.updateUser(payload);
  if (res.error) {
    return {
      error: res.error.message,
      status: res.error.status,
    };
  }
  return res;
};

export const forgotPasswordAction = async (email: string) => {
  const supabase = await createClient();
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aideligate-dashboard-lilac.vercel.app";

  const redirectTo = `${BASE_URL}/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo,
  });
  if (error) {
    return {
      error: error.message,
      status: error.status,
    };
  }
  return {
    error: null,
    status: 200,
  };
};
export const updatePassword = async (newPassword: string, token: string) => {
  const supabase = await createClient();
  const { error: authError } = await supabase.auth.exchangeCodeForSession(token);
  if (authError) return { error: authError.message };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  await supabase.auth.signOut();
  return { error: error?.message };
};

export const updateEmail = async (newEmail: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email: newEmail });
  return { error: error?.message };
};

export const whoAmI = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
