import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

const data = [

    { name:"India", value:28 },

    { name:"USA", value:21 },

    { name:"Germany", value:13 },

    { name:"Russia", value:9 },

    { name:"Others", value:29 }

];

const COLORS = [

    "#3B82F6",

    "#22C55E",

    "#F59E0B",

    "#A855F7",

    "#64748B"

];

const CountryChart = () => {

    return (

        <div className="bg-[#0B1424] border border-slate-800 rounded-3xl p-6 h-[380px]">

            <h2 className="text-white text-xl font-semibold mb-5">

                Top Countries

            </h2>

            <ResponsiveContainer>

                <PieChart>

                    <Pie

                        data={data}

                        innerRadius={70}

                        outerRadius={110}

                        dataKey="value"

                    >

                        {

                            data.map((entry,index)=>(

                                <Cell

                                    key={index}

                                    fill={COLORS[index]}

                                />

                            ))

                        }

                    </Pie>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default CountryChart;