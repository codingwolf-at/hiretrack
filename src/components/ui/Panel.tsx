const Panel = ({ children, classes = "" }: { children: React.ReactNode, classes?: string }) => {
    return (
        <div className={`rounded-xl bg-[#1a1a1a] border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] ${classes}`}>
            {children}
        </div>
    );
};

export default Panel;