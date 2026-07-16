import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const data = [
    { time: "00:00", connections: 120 },
    { time: "04:00", connections: 280 },
    { time: "08:00", connections: 510 },
    { time: "12:00", connections: 360 },
    { time: "16:00", connections: 240 },
    { time: "20:00", connections: 390 },
    { time: "24:00", connections: 170 }
];

const ConnectionChart = () => {

    return (

        <div className="bg-[#0B1424] border border-slate-800 rounded-3xl p-6 h-[380px]">

            <h2 className="text-white text-xl font-semibold mb-6">

                Connections Over Time

            </h2>

            <ResponsiveContainer width="100%" height="88%">

                <LineChart data={data}>

                    <CartesianGrid stroke="#1E293B" />

                    <XAxis
                        dataKey="time"
                        stroke="#94A3B8"
                    />

                    <YAxis stroke="#94A3B8"/>

                    <Tooltip/>

                    <Line
                        type="monotone"
                        dataKey="connections"
                        stroke="#3B82F6"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default ConnectionChart;