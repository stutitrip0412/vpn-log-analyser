import { NavLink } from "react-router-dom";

const NavItem = ({ icon: Icon, label, to }) => {

    return (

        <NavLink

            to={to}

            className={({ isActive }) =>

                `
                flex items-center
                gap-4
                px-5
                py-4
                rounded-xl
                font-medium
                transition-all
                duration-300

                ${
                    isActive

                        ? "bg-cyan-600 shadow-lg text-white"

                        : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"

                }
                `
            }

        >

            <Icon size={20} />

            {label}

        </NavLink>

    );

};

export default NavItem;