import Card from "../common/Card";
import Badge from "../common/Badge";

const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconBg,
    iconColor,
    trend,
    positive = true
}) => {

    return (

        <Card className="p-6">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-xs uppercase tracking-[2px] text-slate-400">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-white">

                        {value}

                    </h2>

                    <div className="mt-4 flex items-center gap-2">

                        <Badge
                            value={trend}
                            positive={positive}
                        />

                        <span className="text-sm text-slate-400">

                            {subtitle}

                        </span>

                    </div>

                </div>

                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                        background: iconBg
                    }}
                >

                    <Icon
                        size={32}
                        color={iconColor}
                    />

                </div>

            </div>

        </Card>

    );

};

export default StatCard;