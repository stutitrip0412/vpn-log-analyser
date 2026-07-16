const Loader = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-5">
                <div className="h-14 w-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>

                <h2 className="text-cyan-400 text-lg font-semibold">
                    Loading VPN Dashboard...
                </h2>
            </div>
        </div>
    );
};

export default Loader;