import {

    PieChart,

    Pie,

    Cell,

    ResponsiveContainer

} from "recharts";

const data = [

    {

        name:"Success",

        value:82

    },

    {

        name:"Failed",

        value:18

    }

];

const COLORS=[

    "#22C55E",

    "#EF4444"

];

const LoginStatusChart=()=>{

    return(

        <div className="bg-[#0B1424] border border-slate-800 rounded-3xl p-6 h-[380px]">

            <h2 className="text-xl text-white font-semibold mb-5">

                Login Status

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

    )

}

export default LoginStatusChart;