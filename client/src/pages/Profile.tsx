import { useUser } from "@store/slices/user";
import { FC } from "react";

const Profile: FC = () => {
    const { user } = useUser();

    return (
        <div className="flex h-full">
            <div className="w-96 h-full flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gray-400"></div>
                <div className="flex flex-col items-center">
                    <p>
                        {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-sm italic text-gray-500">@{user?.username}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
