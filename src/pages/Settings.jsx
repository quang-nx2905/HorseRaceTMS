import { useState } from "react";

import {
    useTheme,
} from "../context/ThemeContext";

function Settings() {

    const {
        darkMode,
        toggleTheme,
    } = useTheme();

    const [emailNotification,
        setEmailNotification] =
        useState(true);

    const [smsNotification,
        setSmsNotification] =
        useState(false);

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
                        Settings
                    </h1>

                    <p className="text-zinc-500 text-lg">
                        Customize your dashboard
                        experience and preferences.
                    </p>

                </div>

                {/* SETTINGS CARD */}
                <div
                    className="
            bg-white
            dark:bg-zinc-900

            border
            border-zinc-200
            dark:border-zinc-800

            rounded-[32px]

            p-10

            max-w-[700px]
          "
                >

                    {/* THEME */}
                    <div
                        className="
              flex
              items-center
              justify-between
              pb-8
              border-b
              border-zinc-200
              dark:border-zinc-800
            "
                    >

                        <div>

                            <h2
                                className="
                  text-2xl
                  font-bold
                  dark:text-white
                  mb-2
                "
                            >
                                Dark Mode
                            </h2>

                            <p className="text-zinc-500">
                                Enable dark appearance
                                for the dashboard.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                toggleTheme()
                            }
                            className={`
                w-[80px]
                h-[44px]
                rounded-full
                transition-all
                relative

                ${darkMode
                                    ? "bg-yellow-400"
                                    : "bg-zinc-300"}
              `}
                        >

                            <div
                                className={`
                  absolute
                  top-1
                  w-[36px]
                  h-[36px]
                  rounded-full
                  bg-white
                  transition-all

                  ${darkMode
                                        ? "left-[40px]"
                                        : "left-1"}
                `}
                            />

                        </button>

                    </div>

                    {/* NOTIFICATIONS */}

                    <div
                        className="
        pt-8
        pb-8

        border-b
        border-zinc-200
        dark:border-zinc-800
    "
                    >

                        <h2
                            className="
            text-2xl
            font-bold
            dark:text-white
            mb-6
        "
                        >
                            Notifications
                        </h2>

                        <div className="space-y-5">

                            <div
                                className="
                flex
                justify-between
                items-center
            "
                            >

                                <p className="dark:text-white">
                                    Email Notifications
                                </p>

                                <input
                                    type="checkbox"
                                    checked={
                                        emailNotification
                                    }
                                    onChange={() =>
                                        setEmailNotification(
                                            !emailNotification
                                        )
                                    }
                                />

                            </div>

                            <div
                                className="
                flex
                justify-between
                items-center
            "
                            >

                                <p className="dark:text-white">
                                    SMS Notifications
                                </p>

                                <input
                                    type="checkbox"
                                    checked={
                                        smsNotification
                                    }
                                    onChange={() =>
                                        setSmsNotification(
                                            !smsNotification
                                        )
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    {/* ACCOUNT */}
                    <div className="pt-8">

                        <h2
                            className="
                text-2xl
                font-bold
                dark:text-white
                mb-6
              "
                        >
                            Account Preferences
                        </h2>

                        <div className="pt-8">

                            <h2
                                className="
            text-2xl
            font-bold
            dark:text-white
            mb-6
        "
                            >
                                Security
                            </h2>

                            <div className="space-y-5">

                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className="
                w-full
                h-[60px]

                bg-zinc-100
                dark:bg-zinc-800

                rounded-2xl
                px-5

                dark:text-white
            "
                                />

                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="
                w-full
                h-[60px]

                bg-zinc-100
                dark:bg-zinc-800

                rounded-2xl
                px-5

                dark:text-white
            "
                                />

                                <button
                                    className="
                bg-red-500
                hover:bg-red-600

                text-white

                px-8
                py-4

                rounded-2xl
            "
                                >
                                    Change Password
                                </button>

                            </div>

                        </div>

                        <div className="space-y-5">

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="
                  w-full
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
                  w-full
                  h-[60px]

                  bg-zinc-100
                  dark:bg-zinc-800

                  rounded-2xl
                  px-5

                  outline-none

                  dark:text-white
                "
                            />

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
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
}

export default Settings;