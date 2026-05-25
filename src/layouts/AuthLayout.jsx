function AuthLayout({
    children,
}) {

    return (
        <div
            className="
        min-h-screen
        grid
        grid-cols-2
        bg-[#f5f5f4]
      "
        >

            {/* LEFT */}
            <div
                className="
          hidden
          lg:flex
          relative
          overflow-hidden
        "
            >

                {/* Background */}
                <img
                    src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?q=80&w=2070"
                    alt="horse"
                    className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
                />

                {/* Overlay */}
                <div
                    className="
            absolute
            inset-0
            bg-black/50
          "
                ></div>

                {/* Content */}
                <div
                    className="
            relative
            z-10
            p-16
            text-white
            flex
            flex-col
            justify-end
          "
                >

                    <p
                        className="
              uppercase
              tracking-[5px]
              text-yellow-400
              mb-6
            "
                    >
                        Horse Race Tournament
                    </p>

                    <h1
                        className="
              text-6xl
              font-bold
              leading-tight
              mb-6
            "
                    >
                        Elite Racing
                        Management
                        Platform
                    </h1>

                    <p
                        className="
              text-zinc-300
              text-lg
              leading-relaxed
              max-w-[500px]
            "
                    >
                        Manage tournaments, track live races,
                        monitor analytics, and build
                        championship experiences.
                    </p>

                </div>

            </div>

            {/* RIGHT */}
            <div
                className="
          flex
          items-center
          justify-center
          p-8
        "
            >

                {children}

            </div>

        </div>
    );
}

export default AuthLayout;