const Card = ({
    children,
    className = ""
}) => {

    return (

        <div
            className={`
                bg-[#101B2B]
                border
                border-white/10
                rounded-2xl
                shadow-[0_15px_40px_rgba(0,0,0,.35)]
                transition-all
                duration-300
                hover:border-cyan-500/30
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(0,212,255,.12)]
                ${className}
            `}
        >
            {children}
        </div>

    );

};

export default Card;