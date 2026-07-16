import { AlertTriangle } from "lucide-react";

const ThreatItem = ({
    title,
    description,
    time,
    color = "text-red-400"
}) => {

    return (

        <div
            className="
                flex
                gap-4
                items-start
                p-4
                rounded-xl
                border
                border-slate-800
                hover:border-slate-700
                hover:bg-slate-900/40
                transition
            "
        >

            <div
                className="
                    h-11
                    w-11
                    rounded-xl
                    bg-red-500/10
                    flex
                    items-center
                    justify-center
                "
            >

                <AlertTriangle
                    size={18}
                    className={color}
                />

            </div>

            <div className="flex-1">

                <h4
                    className={`font-semibold ${color}`}
                >

                    {title}

                </h4>

                <p className="text-slate-400 text-sm mt-1">

                    {description}

                </p>

            </div>

            <span className="text-xs text-slate-500">

                {time}

            </span>

        </div>

    );

};

export default ThreatItem;