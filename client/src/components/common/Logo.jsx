import { Shield } from "lucide-react";

const Logo = () => {

    return (

        <div className="flex items-center gap-4">

            <div className="h-12 w-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center border border-cyan-400/20">

                <Shield className="text-cyan-400" size={24} />

            </div>

            <div>

                <h1 className="font-bold text-lg tracking-wide">

                    VPN Analyzer

                </h1>

                <p className="text-xs text-slate-400">

                    Digital Forensics Suite

                </p>

            </div>

        </div>

    );

};

export default Logo;