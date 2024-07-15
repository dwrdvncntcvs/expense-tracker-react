import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import path from "path";
import { storage } from "../firebase";

export default class FirebaseStorage {
    constructor(private storageFieldName: string) {}

    async uploadSingleFile(
        file: Express.Multer.File | undefined,
        options?: { customFilename: string }
    ) {
        if (!file) throw new Error("Can't upload file");

        const { buffer, mimetype } = file;
        const _filename = this.createFileName(file, options?.customFilename);

        const _storage = this.createStorage(_filename);
        await uploadBytes(_storage, buffer, { contentType: mimetype });
        return await getDownloadURL(_storage);
    }

    async deleteFile(url: string) {
        const _storage = this.createStorageFromURL(url);

        const response = await deleteObject(_storage);
        return response;
    }

    createStorage(filename: string) {
        return ref(storage, `${this.storageFieldName}/${filename}`);
    }

    createStorageFromURL(url: string) {
        return ref(storage, url);
    }

    createFileName(
        file: Express.Multer.File | undefined,
        fileName?: string | undefined
    ) {
        if (!file) throw new Error("Cannot generate filename");

        const { fieldname, filename, originalname } = file;
        return `${
            fileName ? `${fileName.split(" ").join("-").toLowerCase()}-` : ""
        }${fieldname}-${Date.now()}${path.extname(originalname)}`;
    }
}
