import Button from "@components/Button";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { useUploadProfileImageMutation } from "@store/queries/user";
import { hide } from "@store/slices/modal";
import { success } from "@store/slices/toast";
import { FC, useRef, useState } from "react";

const UploadProfileImage: FC = () => {
    const dispatch = useAppDispatch();
    const fileRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageData, setImageData] = useState<File | null>();

    const [uploadImageRequest] = useUploadProfileImageMutation();

    const removeImageData = () => {
        setImageData(null);
        setImageUrl("");
    };

    return (
        <Modal name="upload-profile-image" title="Upload Profile Image">
            <div className="flex flex-col gap-4 justify-center items-center">
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                        const files = e.target.files;

                        if (!files) return;

                        const file = files[0];

                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = (e) => {
                            console.log(e.target?.result);
                            setImageUrl(e.target?.result as string);
                            setImageData(file);
                        };
                    }}
                />
                {imageUrl ? (
                    <div className="w-44 h-44 bg-gray-500 rounded-full p-[2px] overflow-auto">
                        <img
                            src={imageUrl}
                            className="object-cover w-full h-full rounded-full"
                            alt=""
                        />
                    </div>
                ) : (
                    <div
                        className="w-44 h-44 bg-slate-300 rounded-full"
                        onClick={() => {
                            fileRef.current?.click();
                        }}
                    ></div>
                )}
                {imageData && (
                    <div className="flex gap-4">
                        <Button
                            className="p-4 py-2"
                            bgColor="failure"
                            onClick={removeImageData}
                        >
                            Remove
                        </Button>
                        <Button
                            className="p-4 py-2"
                            onClick={async () => {
                                await uploadImageRequest({ imageData });

                                dispatch(
                                    success({
                                        message:
                                            "Profile image successfully changed",
                                    })
                                );
                                dispatch(hide());
                            }}
                        >
                            Save
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default UploadProfileImage;
