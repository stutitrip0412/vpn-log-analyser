import { ShieldCheck, CalendarDays } from "lucide-react";

const DashboardHero = () => {

    const today = new Date().toLocaleString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    return (

        <section
            className="
                mb-10
                rounded-3xl
                border
                border-slate-800
                bg-gradient-to-r
                from-[#0B1424]
                via-[#0F1C30]
                to-[#12223D]
                p-8
                xl:p-10
            "
        >

            <div className="flex flex-col lg:flex-row justify-between gap-8">

                {/* Left */}

                <div>

                    <div className="flex items-center gap-3 mb-4">

                        <div
                            className="
                                h-12
                                w-12
                                rounded-2xl
                                bg-blue-600/20
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <ShieldCheck
                                size={26}
                                className="text-cyan-400"
                            />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold text-white">

                                Dashboard Overview

                            </h1>

                            <p className="text-slate-400 mt-1">

                                VPN Forensic Investigation & Threat Monitoring

                            </p>

                        </div>

                    </div>

                    <p className="text-slate-300 max-w-3xl leading-8">

                        Monitor VPN sessions, detect anomalies, investigate
                        suspicious activities and visualize connection
                        intelligence in real time from a unified forensic
                        dashboard.

                    </p>

                </div>

                {/* Right */}

                <div
                    className="
                        rounded-2xl
                        bg-[#111C2D]
                        border
                        border-slate-700
                        px-6
                        py-5
                        min-w-[280px]
                    "
                >

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            size={22}
                            className="text-cyan-400"
                        />

                        <div>

                            <p className="text-sm text-slate-400">

                                Today's Date

                            </p>

                            <h3 className="font-semibold text-white">

                                {today}

                            </h3>

                        </div>

                    </div>

                    <div className="mt-6">

                        <p className="text-slate-400 text-sm">

                            System Status

                        </p>

                        <div className="flex items-center gap-2 mt-2">

                            <span className="h-3 w-3 rounded-full bg-green-500"/>

                            <span className="text-green-400">

                                All Services Operational

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default DashboardHero;