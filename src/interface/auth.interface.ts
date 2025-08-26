export interface IUserSignUp {
  email: string;
  password: string;
  full_name: string;
  role: "owner" | "manager" | "staff";
}
