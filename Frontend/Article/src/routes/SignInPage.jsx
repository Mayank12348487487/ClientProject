import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
           <SignIn path="/sign-in"/>
        </div>
    );
}
export default SignInPage