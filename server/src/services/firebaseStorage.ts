import { storage } from "../firebase";
import {
    deleteObject,
    getBlob,
    getDownloadURL,
    uploadBytes,
    ref,
} from "firebase/storage";
import path from "path";

export default class FirebaseStorage {
    constructor(private storageFieldName: string) {}

    async uploadSingleFile(file: Express.Multer.File | undefined) {
        if (!file) throw new Error("Can't upload file");

        const { buffer, fieldname, filename, mimetype, originalname } = file;
        const _filename = `${fieldname}-${filename}-${Date.now()}${path.extname(
            originalname
        )}`;

        const _storage = this.createStorage(_filename);
        await uploadBytes(_storage, buffer, { contentType: mimetype });
        return await getDownloadURL(_storage);
    }

    private createStorage(filename: string) {
        return ref(storage, `${this.storageFieldName}/${filename}`);
    }

    private createStorageFromURL(url: string) {
        return ref(storage, url);
    }
}
