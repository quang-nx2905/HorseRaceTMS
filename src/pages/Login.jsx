import {
    Link,
    useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        login(email, password);

        toast.success("Login successful");

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
                <form onSubmit={handleLogin} className="space-y-6">

                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        required
                    />

                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        required
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

                        <button type="button" className="text-yellow-500 font-semibold hover:text-yellow-600">

                            Forgot Password?

                        </button>

                    </div>

                    <Button type="submit">
                        Sign In
                    </Button>

                </form>

                {/* Footer */}
                <p
                    className="
            text-center
            text-zinc-500
            mt-8
          "
                >
                    Don't have an account?

                    <Link
                        to="/register"
                        className="
              text-yellow-500
              font-semibold
              ml-2
              hover:text-yellow-600
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