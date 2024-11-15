export default class FileService {
    constructor() {}

    async extractJsonData(file: Express.Multer.File) {
        const data = file.buffer.toString("utf-8");
        return JSON.parse(data);
    }
}
