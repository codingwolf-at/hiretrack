type StatCardProps = {
    title: string,
    value: number,
    icon?: React.ReactNode,
};

const StatCard = ({ title, value, icon }: StatCardProps) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl bg-[#1a1a1a] border border-white/10 p-6 hover:bg-[#202020] hover:border-white/20 transition-all duration-200 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:-translate-y-px">
            {icon ? (
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    {icon}
                </div>
            ) : null}
            <p className="text-3xl font-semibold tracking-tight text-white ml-0.5">{value}</p>
            <p className="text-sm text-gray-500 ml-0.5">{title}</p>
        </div>
    );
};

export default StatCard;