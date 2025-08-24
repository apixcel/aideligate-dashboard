// hooks/useAuth.ts
"use client";

import { createClient as createBrowserClient } from "@/utils/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

type UseAuthOptions = {
  /** Optional session from the server to avoid initial loading flicker */
  initialSession?: Session | null;
};

export function useAuth(opts: UseAuthOptions = {}) {
  const supabase = useMemo(() => createBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(opts.initialSession ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(opts.initialSession === undefined);

  useEffect(() => {
    let mounted = true;

    // Only fetch if no initialSession provided
    if (opts.initialSession === undefined) {
      supabase.auth.getSession().then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      // no loading here; this runs after we already resolved the first state
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, opts.initialSession]);

  const user: User | null = session?.user ?? null;
  return { session, user, isLoading, supabase };
}
