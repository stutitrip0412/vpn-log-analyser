import ThreatItem from "./ThreatItem";

const ThreatPanel = () => {

    const threats = [

        {
            title: "Impossible Travel",
            description: "User john.doe logged in from India → Germany",
            time: "09:16",
            color: "text-red-400"
        },

        {
            title: "Simultaneous Login",
            description: "admin active from USA & Russia",
            time: "10:22",
            color: "text-yellow-400"
        },

        {
            title: "Brute Force Attack",
            description: "203.45.67.89 • 23 failed attempts",
            time: "11:05",
            color: "text-orange-400"
        },

        {
            title: "Multiple VPN Locations",
            description: "User james • 3 countries detected",
            time: "11:47",
            color: "text-amber-400"
        }

    ];

    return (

        <div
            className="
                rounded-3xl
                bg-[#0B1424]
                border
                border-slate-800
                p-6
            "
        >

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-semibold text-white">

                    Threat Intelligence

                </h2>

                <button className="text-cyan-400 text-sm">

                    View All

                </button>

            </div>

            <div className="space-y-4">

                {threats.map((item) => (

                    <ThreatItem
                        key={item.title}
                        {...item}
                    />

                ))}

            </div>

        </div>

    );

};

export default ThreatPanel;