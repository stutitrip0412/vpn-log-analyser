const StatusPanel = () => {

    return (

        <div className="rounded-2xl bg-[#101B2B] border border-white/10 p-5">

            <h3 className="font-semibold mb-4">

                System Status

            </h3>

            <div className="space-y-3 text-sm">

                <div className="flex justify-between">

                    <span>Database</span>

                    <span className="text-green-400">

                        ● Online

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Parser</span>

                    <span className="text-green-400">

                        ● Running

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Analytics</span>

                    <span className="text-green-400">

                        ● Active

                    </span>

                </div>

            </div>

        </div>

    );

};

export default StatusPanel;