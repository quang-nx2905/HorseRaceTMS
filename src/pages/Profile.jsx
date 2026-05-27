import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {

    return (

        <>

            <div className="space-y-10">

                {/* HEADER */}
                <div>

                    <h1
                        className="
              text-5xl
              font-bold
              dark:text-white
              mb-3
            "
                    >
                        Profile
                    </h1>

                    <p className="text-zinc-500 text-lg">
                        Manage your personal information
                        and account details.
                    </p>

                </div>

                {/* PROFILE CARD */}
                <div
                    className="
            bg-white
            dark:bg-zinc-900

            border
            border-zinc-200
            dark:border-zinc-800

            rounded-[32px]

            p-10

            max-w-[900px]
          "
                >

                    {/* TOP */}
                    <div
                        className="
              flex
              flex-col
              md:flex-row
              md:items-center
              gap-8
              pb-10
              border-b
              border-zinc-200
              dark:border-zinc-800
            "
                    >

                        {/* Avatar */}
                        <div
                            className="
                w-[120px]
                h-[120px]

                rounded-full

                bg-yellow-400

                flex
                items-center
                justify-center

                text-5xl
                font-bold
              "
                        >
                            A
                        </div>

                        {/* Info */}
                        <div>

                            <h2
                                className="
                  text-4xl
                  font-bold
                  dark:text-white
                  mb-3
                "
                            >
                                Admin User
                            </h2>

                            <p className="text-zinc-500 mb-2">
                                admin@equinerace.com
                            </p>

                            <div
                                className="
                  inline-flex
                  px-4
                  py-2
                  rounded-full

                  bg-yellow-100
                  text-yellow-700

                  text-sm
                  font-semibold
                "
                            >
                                Tournament Director
                            </div>

                        </div>

                    </div>

                    {/* FORM */}
                    <div className="pt-10">

                        <div
                            className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
                        >

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="
                  h-[60px]

                  bg-zinc-100
                  dark:bg-zinc-800

                  rounded-2xl

                  px-5

                  outline-none

                  dark:text-white
                "
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="
                  h-[60px]

                  bg-zinc-100
                  dark:bg-zinc-800

                  rounded-2xl

                  px-5

                  outline-none

                  dark:text-white
                "
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="
                  h-[60px]

                  bg-zinc-100
                  dark:bg-zinc-800

                  rounded-2xl

                  px-5

                  outline-none

                  dark:text-white
                "
                            />

                            <input
                                type="text"
                                placeholder="Organization"
                                className="
                  h-[60px]

                  bg-zinc-100
                  dark:bg-zinc-800

                  rounded-2xl

                  px-5

                  outline-none

                  dark:text-white
                "
                            />

                        </div>

                        {/* BUTTON */}
                        <div className="mt-8">

                            <button
                                className="
                  bg-yellow-400
                  hover:bg-yellow-300

                  px-8
                  py-4

                  rounded-2xl

                  font-semibold

                  transition-all
                "
                            >
                                Update Profile
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
}

export default Profile;