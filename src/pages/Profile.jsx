import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function Profile() {
    const [profile, setProfile] =
        useState({
            name: "Admin User",
            email: "admin@equinerace.com",
            phone: "0123456789",
            organization:
                "Horse Race Tournament",
        });

    return (

        <>

            <div className="space-y-10">

                {/* HEADER */}
                <div>

                    <h1
                        className="text-5xl font-bold mb-3"
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
                    className="bg-white border border-zinc-200 rounded-[32px] p-10 max-w-[900px]"
                >

                    {/* TOP */}
                    <div
                        className="flex flex-col md:flex-row md:items-center gap-8 pb-10 border-b border-zinc-200"
                    >

                        {/* Avatar */}
                        <div
                            className="w-[120px] h-[120px] rounded-full bg-yellow-400 flex items-center justify-center text-5xl font-bold"
                        >
                            {profile.name.charAt(0)}
                        </div>

                        {/* Info */}
                        <div>

                            <h2
                                className="text-4xl font-bold mb-3"
                            >
                                {profile.name}
                            </h2>

                            <p className="text-zinc-500 mb-2">
                                admin@equinerace.com
                            </p>

                            <div
                                className="inline-flex px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold"
                            >
                                Tournament Director
                            </div>

                        </div>

                    </div>

                    {/* FORM */}
                    <div className="pt-10">

                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >

                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value,
                                    })
                                }
                                className="h-[60px] bg-zinc-100 rounded-2xl px-5 outline-none"
                            />

                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value,
                                    })
                                }
                                className="h-[60px] bg-zinc-100 rounded-2xl px-5 outline-none"
                            />

                            <input
                                type="text"
                                value={profile.phone}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        phone: e.target.value,
                                    })
                                }
                                className="h-[60px] bg-zinc-100 rounded-2xl px-5 outline-none"
                            />

                            <input
                                type="text"
                                value={profile.organization}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        organization:
                                            e.target.value,
                                    })
                                }
                                className="h-[60px] bg-zinc-100 rounded-2xl px-5 outline-none"
                            />

                        </div>

                        {/* BUTTON */}
                        <div className="mt-8">

                            <button
                                onClick={() => {
                                    toast.success(
                                        "Profile updated successfully!"
                                    );
                                }}
                                className="bg-yellow-400 hover:bg-yellow-300 px-8 py-4 rounded-2xl font-semibold transition-all"
                            >
                                Update Profile
                            </button>

                        </div>

                        {/* STATS */}

                        <div
                            className="grid grid-cols-1 md:grid-cols-4 gap-6"
                        >

                            <div className="card p-6">

                                <p className="text-zinc-500">
                                    Total Races
                                </p>

                                <h2 className="text-4xl font-black mt-3">
                                    128
                                </h2>

                            </div>

                            <div className="card p-6">

                                <p className="text-zinc-500">
                                    Horses Managed
                                </p>

                                <h2 className="text-4xl font-black mt-3">
                                    56
                                </h2>

                            </div>

                            <div className="card p-6">

                                <p className="text-zinc-500">
                                    Jockeys
                                </p>

                                <h2 className="text-4xl font-black mt-3">
                                    24
                                </h2>

                            </div>

                            <div className="card p-6">

                                <p className="text-zinc-500">
                                    Win Rate
                                </p>

                                <h2 className="text-4xl font-black mt-3">
                                    86%
                                </h2>

                            </div>

                        </div>

                        {/* RECENT ACTIVITIES */}

                        <div
                            className="bg-white border border-zinc-200 rounded-[32px] p-8"
                        >

                            <h2
                                className="text-3xl font-bold mb-8"
                            >
                                Recent Activities
                            </h2>

                            <div className="space-y-5">

                                <div
                                    className="border-b border-zinc-200 pb-4"
                                >

                                    <p className="font-semibold">
                                        Updated horse profile
                                    </p>

                                    <p className="text-zinc-500 text-sm mt-1">
                                        5 minutes ago
                                    </p>

                                </div>

                                <div
                                    className="border-b border-zinc-200 pb-4"
                                >

                                    <p className="font-semibold">
                                        Created new tournament
                                    </p>

                                    <p className="text-zinc-500 text-sm mt-1">
                                        20 minutes ago
                                    </p>

                                </div>

                                <div
                                    className="border-b border-zinc-200 pb-4"
                                >

                                    <p className="font-semibold">
                                        Added new jockey
                                    </p>

                                    <p className="text-zinc-500 text-sm mt-1">
                                        1 hour ago
                                    </p>

                                </div>

                                <div>

                                    <p className="font-semibold">
                                        Updated race results
                                    </p>

                                    <p className="text-zinc-500 text-sm mt-1">
                                        Yesterday
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
}

export default Profile;