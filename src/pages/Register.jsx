import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {

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
                <div className="space-y-6">

                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                    />

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create password"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                    />

                    <Button>
                        Create Account
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
                    Already have an account?
                    <span className="text-yellow-500 font-semibold ml-2 cursor-pointer">

                        Sign In

                    </span>
                </p>

            </div>

        </AuthLayout>
    );
}

export default Register;