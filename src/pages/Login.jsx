function Login() {
  return (
    <div className="min-h-screen bg-black flex">

      {/* Left Side */}
      <div className="w-1/2 bg-zinc-950 flex flex-col justify-center px-20">

        <h1 className="text-6xl font-bold text-yellow-400 mb-6">
          HorseRaceTMS
        </h1>

        <p className="text-zinc-400 text-xl leading-relaxed">
          Premium Horse Racing Tournament
          Management Platform with real-time
          race tracking, prediction system,
          leaderboard analytics and tournament management.
        </p>

      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-zinc-900">

        <div className="w-[450px] bg-black border border-zinc-800 rounded-3xl p-10 shadow-2xl">

          <h2 className="text-4xl font-bold text-white mb-8">
            Login
          </h2>

          {/* Email */}
          <div className="mb-6">

            <label className="block text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none text-white"
            />

          </div>

          {/* Password */}
          <div className="mb-8">

            <label className="block text-zinc-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none text-white"
            />

          </div>

          {/* Login Button */}
          <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition">

            Login

          </button>

          {/* Footer */}
          <p className="text-zinc-500 text-center mt-6">

            Don’t have an account?
            <span className="text-yellow-400 cursor-pointer ml-2">
              Register
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;