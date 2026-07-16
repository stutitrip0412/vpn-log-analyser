import { ChevronDown } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const UserMenu = () => {
    const { user } = useAuth();

    return (
        <div className="flex items-center gap-3 cursor-pointer">

            <div className="w-11 h-11 rounded-full bg-cyan-600 flex items-center justify-center text-lg font-bold">

                {user?.fullName?.charAt(0) || "U"}

            </div>

            <div className="hidden lg:block">

                <h3 className="font-semibold">

                    {user?.fullName || "Investigator"}

                </h3>

                <p className="text-xs text-slate-400">

                    {user?.role || "Analyst"}

                </p>

            </div>

            <ChevronDown
                size={18}
                className="text-slate-400"
            />

        </div>
    );
};

export default UserMenu;