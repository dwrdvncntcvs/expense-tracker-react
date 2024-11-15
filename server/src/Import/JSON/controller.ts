import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import ErrorService from "../../utils/error";
import ImportService, {
    ImportData,
    InvalidImportData,
    InvalidProperties,
} from "./service";
import FileService from "../../services/fileService";

export default class ImportController {
    constructor(
        private importService: ImportService,
        private fileService: FileService
    ) {}

    importFileReq: RequestHandler = async (req, res, next) => {
        try {
            if (!req.file) return res.status(404).send("File not found...");

            const exportedData = await this.fileService.extractJsonData(
                req.file
            );

            delete exportedData.export_id;
            delete exportedData.date_exported;

            const data = this.importService.cleanData(
                exportedData,
                req.user.id
            );

            let _data: ImportData = {};
            let _invalidData: InvalidImportData = {};

            Object.keys(data).forEach((key) => {
                const _key = key as keyof (ImportData | InvalidProperties);

                if ("invalid" in data[_key]) {
                    _invalidData[_key] = data[_key];
                } else {
                    _data[_key] = data[_key];
                }
            });

            const importedData = await this.importService.importData(_data);

            return res
                .status(200)
                .send({ import: "Hello", importedData, _invalidData });
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    };
}
