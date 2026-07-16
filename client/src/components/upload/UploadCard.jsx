import { UploadCloud } from "lucide-react";

const UploadCard = () => {

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

            <h2 className="text-xl font-semibold text-white mb-6">

                Upload VPN Logs

            </h2>

            <div
                className="
                    border-2
                    border-dashed
                    border-slate-700
                    rounded-2xl
                    h-[290px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    transition
                    hover:border-cyan-500
                "
            >

                <UploadCloud
                    size={55}
                    className="text-cyan-400"
                />

                <h3 className="text-white mt-5 text-lg">

                    Drag & Drop VPN Log File

                </h3>

                <p className="text-slate-400 mt-2">

                    or browse your computer

                </p>

                <button
                    className="
                        mt-7
                        px-6
                        py-3
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        font-medium
                    "
                >

                    Browse Files

                </button>

                <p className="text-xs text-slate-500 mt-6">

                    Supported: .log .txt .gz

                </p>

            </div>

        </div>

    );

};

export default UploadCard;