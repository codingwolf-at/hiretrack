import Spinner from "@/components/ui/Spinner";

const Loading = () => {
    return (
        <div className="flex min-h-[80vh] w-full items-center justify-center">
            <Spinner className="w-8 h-8 border-muted-foreground/30 border-t-foreground" />
        </div>
    );
};

export default Loading;
