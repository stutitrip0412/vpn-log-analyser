import { NavLink } from "react-router-dom";
import clsx from "clsx";

const SidebarItem = ({
    item,
    onClick
}) => {

    const Icon = item.icon;

    return (

        <NavLink
            to={item.path}
            onClick={onClick}
            className={({ isActive }) =>
                clsx(
                    "group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300",
                    isActive
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/20"
                        : "text-slate-400 hover:bg-[#132235] hover:text-cyan-400"
                )
            }
        >
            <Icon
                size={21}
                className="transition-transform duration-300 group-hover:scale-110"
            />

            <span className="font-medium tracking-wide">

                {item.title}

            </span>

        </NavLink>

    );

};

export default SidebarItem;