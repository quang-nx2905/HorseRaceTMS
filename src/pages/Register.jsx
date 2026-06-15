import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (fullName.length >= 20) {
            toast.error("Full Name must be shorter than 20 characters");
            return;
        }

        if (password.length < 9 || password.length > 19) {
            toast.error("Password must be between 9 and 19 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const apiBaseUrl =
                import.meta.env.VITE_API_BASE_URL || "https://localhost:7179";

            await axios.post(`${apiBaseUrl}/api/auth/register`, {
                fullName,
                email,
                password,
                confirmPassword,
            });

            toast.success("Account created successfully");
            navigate("/login");
        } catch (error) {
            console.error("Register Error:", error);
            const errorMessage =
                error.response?.data?.message ||
                "Cannot connect to server. Please check Backend!";
            toast.error(`Registration Failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
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
                        disabled={loading}
                        required
                    />

                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        disabled={loading}
                        required
                    />

                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Create password"
                        disabled={loading}
                        required
                    />

                    <Input
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm password"
                        disabled={loading}
                        required
                    />

                    <Button type="submit" disabled={loading} fullWidth>
                        {loading ? "Creating Account..." : "Create Account"}
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