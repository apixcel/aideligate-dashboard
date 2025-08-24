export interface IUserSignUp {
  email: string;
  password: string;
  role: "owner" | "manager" | "staff";
}
