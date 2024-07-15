import Button from "@components/Button";
import { useField } from "formik";
import { FC, InputHTMLAttributes, LegacyRef, useRef, useState } from "react";
import { HiOutlineTrash, HiPhoto } from "react-icons/hi2";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    imageUrl?: string;
    enableRemoveImage?: boolean;
}

const ImageField: FC<InputProps> = ({
    imageUrl: _imageUrl,
    enableRemoveImage = true,
    ...props
}) => {
    const inputRef = useRef<LegacyRef<HTMLInputElement | undefined>>(null);
    const [imageUrl, setImageUrl] = useState<
        string | null | ArrayBuffer | undefined
    >(_imageUrl);

    const [p1, p2, p3] = useField(props?.name || "");

    const { name } = p1;
    const { error } = p2;
    const { setValue, setError } = p3;

    return (
        <>
            <input
                {...props}
                type="file"
                hidden
                name={name}
                ref={inputRef}
                accept="image/*"
                onChange={(e) => {
                    const files = e.target.files;

                    if (!files?.length) {
                        setValue(undefined);
                        setImageUrl("");
                        return;
                    }

                    const file = files[0];

                    const imageFormats = ["jpeg", "png", "svg", "webp"];

                    if (!imageFormats.some((val) => file.type.includes(val))) {
                        setError(
                            "You are trying to pass an invalid image file type"
                        );
                        return;
                    } else {
                        setError(undefined);
                    }

                    setValue(file);

                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = (e) => {
                        const _imageUrl = e.target?.result;
                        setImageUrl(_imageUrl);
                    };
                }}
            ></input>
            {!imageUrl ? (
                <div className="w-full">
                    <div
                        className={`w-full gap-2 h-36 p-4 flex items-center justify-center border border-dashed  rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-all ${
                            error
                                ? "border-failure text-failure"
                                : "border-gray-400"
                        }`}
                        onClick={() => {
                            inputRef.current?.click();
                        }}
                    >
                        <HiPhoto size={40} />
                        <p className="pointer-events-none text-sm">
                            Select an image to add
                        </p>
                    </div>
                    {error && (
                        <p className="text-failure text-xs text-end mt-2">
                            {error}
                        </p>
                    )}
                </div>
            ) : (
                <div className="relative h-60 object-center w-full border-gray-200 border rounded-lg overflow-auto">
                    {enableRemoveImage && (
                        <Button
                            className="p-2 rounded-full absolute bottom-2 right-2 "
                            bgColor="failure"
                            rounded="full"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setValue(null);
                                setImageUrl(null);
                            }}
                        >
                            <HiOutlineTrash />
                        </Button>
                    )}
                    <img
                        src={imageUrl as string}
                        className=" w-full object-cover h-full"
                    />
                </div>
            )}
        </>
    );
};

export default ImageField;
