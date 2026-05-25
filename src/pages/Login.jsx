import {
    Link,
    useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {

    const navigate = useNavigate();

    const handleLogin = () => {

        /* FAKE JWT TOKEN */
        localStorage.setItem(
            "token",
            "horse-race-demo-token"
        );

        toast.success(
            "Login successful"
        );

        navigate("/");
    };

    return (
        <AuthLayout>

            <div
                className="
          w-full
          max-w-[520px]
          bg-white
          border
          border-zinc-200
          rounded-[40px]
          p-10
        "
            >

                {/* Header */}
                <div className="mb-10">

                    <h1
                        className="
              text-5xl
              font-bold
              mb-4
            "
                    >
                        Welcome Back
                    </h1>

                    <p className="text-zinc-500 text-lg">
                        Sign in to continue managing
                        your tournaments.
                    </p>

                </div>

                {/* Form */}
                <div className="space-y-6">

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />

                    <div
                        className="
              flex
              justify-between
              items-center
              text-sm
            "
                    >

                        <label className="flex items-center gap-2">

                            <input type="checkbox" />

                            Remember me

                        </label>

                        <button className="text-yellow-500 font-semibold">

                            Forgot Password?

                        </button>

                    </div>

                    <Button onClick={handleLogin}>
                        Sign In
                    </Button>

                </div>

                {/* Footer */}
                <p
                    className="
            text-center
            text-zinc-500
            mt-8
          "
                >
                    Don’t have an account?

                    <Link
                        to="/register"
                        className="
              text-yellow-500
              font-semibold
              ml-2
            "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </AuthLayout>
    );
}

export default Login;