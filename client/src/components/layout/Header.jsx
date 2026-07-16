import {
    Menu,
    Bell,
    Search,
    UserCircle2,
    ChevronDown
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Header = ({ openSidebar }) => {

    const { user } = useAuth();

    return (

        <header
            className="
                h-20
                bg-[#08111F]
                border-b
                border-slate-800
                px-8
                flex
                items-center
                justify-between
                sticky
                top-0
                z-30
            "
        >

            {/* Left */}

            <div className="flex items-center gap-5">

                <button
                    onClick={openSidebar}
                    className="
                        lg:hidden
                        p-2
                        rounded-lg
                        hover:bg-slate-800
                    "
                >

                    <Menu
                        size={22}
                        className="text-white"
                    />

                </button>

                <div>

                    <h1 className="text-2xl font-bold text-white">

                        VPN Forensic Dashboard

                    </h1>

                    <p className="text-sm text-slate-400 mt-1">

                        Security Monitoring & Investigation

                    </p>

                </div>

            </div>

            {/* Center */}

            <div className="hidden lg:flex flex-1 justify-center">

                <div
                    className="
                        w-full
                        max-w-lg
                        relative
                    "
                >

                    <Search
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                        "
                    />

                    <input
                        type="text"
                        placeholder="Search logs, users, IP address..."
                        className="
                            w-full
                            bg-[#111C2D]
                            border
                            border-slate-700
                            rounded-xl
                            py-3
                            pl-11
                            pr-4
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                    />

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                {/* Notification */}

                <button
                    className="
                        relative
                        p-3
                        rounded-xl
                        bg-[#111C2D]
                        hover:bg-slate-700
                        transition
                    "
                >

                    <Bell
                        size={20}
                        className="text-white"
                    />

                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            w-2.5
                            h-2.5
                            rounded-full
                            bg-red-500
                        "
                    />

                </button>

                {/* Profile */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        cursor-pointer
                    "
                >

                    <UserCircle2
                        size={42}
                        className="text-cyan-400"
                    />

                    <div className="hidden md:block">

                        <h3 className="font-semibold text-white">

                            {user?.fullName || "Administrator"}

                        </h3>

                        <p className="text-sm text-slate-400">

                            {user?.role || "Cyber Analyst"}

                        </p>

                    </div>

                    <ChevronDown
                        size={18}
                        className="text-slate-400"
                    />

                </div>

            </div>

        </header>

    );

};

export default Header;