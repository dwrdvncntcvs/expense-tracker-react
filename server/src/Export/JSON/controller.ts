import { RequestHandler } from "express";
import ExportService from "./service";

export default class ExportController {
    constructor(private exportService: ExportService) {}

    exportAll: RequestHandler = async (req, res, next) => {
        const user = req.user;

        const data = await this.exportService.exportAll(user.id);

        res.setHeader(
            "Content-disposition",
            `attachment; filename=${new Date().toISOString()}-all-data-export.json`
        );
        res.setHeader("Content-type", "application/json");
        res.write(data);
        res.end();
    };
}
