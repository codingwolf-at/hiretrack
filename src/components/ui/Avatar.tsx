import { getInitials } from "@/lib/ui";

type AvatarProps = {
    userName: string
};

// TODO: add support for image 

const Avatar = ({ userName }: AvatarProps) => {
    const initials = getInitials(userName)
    return (
        <div className="h-10 w-10 flex justify-center items-center rounded-full bg-foreground">
            <span className="font-bold text-background">
                {initials}
            </span>
        </div>
    );
};

export default Avatar;