import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
    return (
        <div className="signup">
           <SignUp path="/sign-ip"/>
        </div>
    );
}
export default SignUpPage