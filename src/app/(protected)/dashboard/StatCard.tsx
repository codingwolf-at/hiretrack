type StatCardProps = {
    title: string,
    value: number,
    subtitle?: string
};

const StatCard = ({ title, value, subtitle }: StatCardProps) => {
    return (
        <div className="flex flex-col gap-6 rounded-xl border p-6 shadow-sm">
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-semibold">{value}</p>
            <p>{subtitle}</p>
        </div>
    );
};

export default StatCard;