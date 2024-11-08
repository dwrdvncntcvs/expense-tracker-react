import multer, { StorageEngine } from "multer";

type StorageType = "disk" | "memory";
type UploadType = "single" | "array";

export default class FileUploadMiddleware {
    private storage: StorageEngine | any;

    constructor(private storage_type: StorageType, private name: string) {
        if (this.storage_type === "disk") {
            this.storage = multer.diskStorage({
                destination: (req, file, cb) => {},
                filename: () => {},
            });
        }

        if (this.storage_type === "memory") {
            this.storage = multer.memoryStorage();
        }
    }

    upload(uploadType: UploadType, ...args: any) {
        const image_s = multer({ storage: this.storage });

        switch (uploadType) {
            case "array": {
                return image_s.array(this.name, ...args);
            }
            case "single": {
                return image_s.single(this.name);
            }
            default: {
                return image_s.single(this.name);
            }
        }
    }
}
