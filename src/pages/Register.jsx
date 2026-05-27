import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

function Register() {

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = (e) => {
        e.preventDefault();

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        register(fullName, email, password);

        toast.success("Account created successfully");

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
                        Create Account
                    </h1>

                    <p className="text-zinc-500 text-lg">
                        Register to access the
                        horse racing tournament platform.
                    </p>

                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-6">

                    <Input
                        name="fullName"
                        label="Full Name"
                        placeholder="Enter your full name"
                        required
                    />

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
                        placeholder="Create password"
                        required
                    />

                    <Input
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm password"
                        required
                    />

                    <Button type="submit">
                        Create Account
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
                    Already have an account?

                    <Link
                        to="/login"
                        className="
              text-yellow-500
              font-semibold
              ml-2
              hover:text-yellow-600
            "
                    >
                        Sign In
                    </Link>

                </p>

            </div>

        </AuthLayout>
    );
}

export default Register;