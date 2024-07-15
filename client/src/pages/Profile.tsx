import { UploadProfileImage } from "@components/Modal";
import { useAppDispatch } from "@hooks/storeHooks";
import { show } from "@store/slices/modal";
import { useUser } from "@store/slices/user";
import { FC } from "react";

const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useUser();

    return (
        <div className="flex h-full">
            <div className="w-96 h-full flex flex-col items-center gap-4">
                <div
                    className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-400 overflow-auto p-1"
                    onClick={() => {
                        dispatch(show("upload-profile-image"));
                    }}
                >
                    <img
                        src={user?.profileImage}
                        className="object-cover w-full h-full rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p>
                        {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-sm italic text-gray-500">
                        @{user?.username}
                    </p>
                </div>
            </div>
            <UploadProfileImage />
        </div>
    );
};

export default Profile;
