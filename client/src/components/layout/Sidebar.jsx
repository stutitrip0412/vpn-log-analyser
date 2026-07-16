import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Upload,
    FileText,
    ShieldAlert,
    BarChart3,
    FolderKanban,
    Database,
    Link2,
    FileBarChart2,
    Settings,
    X,
    Activity
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Upload Logs",
        path: "/upload",
        icon: Upload
    },
    {
        title: "Log Explorer",
        path: "/logs",
        icon: FileText
    },
    {
        title: "Threat Alerts",
        path: "/alerts",
        icon: ShieldAlert
    },
    {
        title: "Analytics",
        path: "/analytics",
        icon: BarChart3
    },
    {
        title: "Cases",
        path: "/cases",
        icon: FolderKanban
    },
    {
        title: "Evidence",
        path: "/evidence",
        icon: Database
    },
    {
        title: "Chain of Custody",
        path: "/custody",
        icon: Link2
    },
    {
        title: "Reports",
        path: "/reports",
        icon: FileBarChart2
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings
    }
];

const Sidebar = ({ mobile = false, onClose }) => {
    return (
        <aside
            className={`
                h-screen
                w-[280px]
                bg-[#0B1424]
                border-r
                border-slate-800
                flex
                flex-col
                ${mobile ? "" : "sticky top-0"}
            `}
        >

            {/* Logo */}

            <div className="h-20 px-6 border-b border-slate-800 flex items-center justify-between">

                <div>

                    <h1 className="text-xl font-bold text-white">

                        VPN Analyzer

                    </h1>

                    <p className="text-xs text-slate-400 mt-1">

                        Digital Forensics

                    </p>

                </div>

                {mobile && (

                    <button
                        onClick={onClose}
                        className="text-slate-400"
                    >
                        <X size={20}/>
                    </button>

                )}

            </div>

            {/* Navigation */}

            <div className="flex-1 overflow-y-auto px-4 py-6">

                <div className="space-y-2">

                    {menuItems.map((item)=>{

                        const Icon=item.icon;

                        return(

                            <NavLink
                                key={item.title}
                                to={item.path}
                                onClick={mobile ? onClose : undefined}
                                className={({isActive})=>`
                                    flex
                                    items-center
                                    gap-4
                                    rounded-xl
                                    px-4
                                    py-3
                                    transition-all
                                    duration-200

                                    ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }
                                `}
                            >

                                <Icon size={20}/>

                                <span className="font-medium">

                                    {item.title}

                                </span>

                            </NavLink>

                        );

                    })}

                </div>

            </div>

            {/* Bottom Card */}

            <div className="p-5 border-t border-slate-800">

                <div className="rounded-2xl bg-[#111C2D] p-5">

                    <div className="flex items-center justify-between mb-4">

                        <span className="text-sm font-semibold text-white">

                            System Health

                        </span>

                        <Activity
                            size={18}
                            className="text-green-400"
                        />

                    </div>

                    <div className="space-y-3">

                        <Status
                            label="Database"
                            status="Online"
                        />

                        <Status
                            label="Parser"
                            status="Running"
                        />

                        <Status
                            label="Analytics"
                            status="Healthy"
                        />

                    </div>

                </div>

                <p className="text-center text-xs text-slate-500 mt-5">

                    VPN Forensic Suite

                    <br/>

                    Version 1.0

                </p>

            </div>

        </aside>
    );
};

const Status=({label,status})=>(

    <div className="flex justify-between items-center">

        <span className="text-slate-400 text-sm">

            {label}

        </span>

        <span className="text-green-400 text-sm font-medium">

            {status}

        </span>

    </div>

);

export default Sidebar;