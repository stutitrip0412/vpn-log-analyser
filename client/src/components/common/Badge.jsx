const Badge = ({
    value,
    positive = true
}) => {

    return (

        <div
            className={`
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium

                ${
                    positive

                        ? "text-green-400"

                        : "text-orange-400"

                }
            `}
        >

            <span>

                {positive ? "▲" : "▼"}

            </span>

            <span>{value}</span>

        </div>

    );

};

export default Badge;