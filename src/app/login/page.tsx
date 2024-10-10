import { Suspense } from "react";
import LoginForm from "./_components/loginForm";


const Page = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Page;