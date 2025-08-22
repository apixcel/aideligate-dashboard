const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-darker bg-gradient-to-b from-darkest to-black-tertiary px-6 py-8 shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
