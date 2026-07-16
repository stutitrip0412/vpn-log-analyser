import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="hidden md:flex items-center gap-3 bg-[#101B2B] border border-white/10 rounded-xl px-4 py-3 w-full max-w-xl transition-all duration-300 hover:border-cyan-500/40">
            <Search size={18} className="text-slate-400" />

            <input
                type="text"
                placeholder="Search VPN logs, IP address, username..."
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-500"
            />
        </div>
    );
};

export default SearchBar;