import SignUpForm from "./_components/SignUpForm";
import { Suspense } from "react";

const SignUp = () => {
  return (
    <div className="pt-6">
      {/* Wrap the SignUpForm component in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
};

export default SignUp;