import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import ExportService from "./service";
import ErrorService from "../../utils/error";

export type ExportMethod =
    | "all"
    | "expenses"
    | "yearly_expenses"
    | "monthly_expenses"
    | "categories"
    | "tags";

export default class ExportController {
    constructor(private exportService: ExportService) {}

    exportData: RequestHandler<
        ParamsDictionary,
        any,
        any,
        { month?: string; year?: string },
        Record<string, any>
    > = async (req, res, next) => {
        try {
            const user = req.user;
            const type = req.params.method_type as ExportMethod;
            const queries = req.query;

            let data: string | undefined = undefined;

            switch (type) {
                case "all":
                    data = await this.exportService.exportAll(user.id);
                    break;
                case "categories":
                    data = await this.exportService.exportCategories(user.id);
                    break;
                case "expenses":
                    data = await this.exportService.exportExpenses(user.id);
                    break;
                case "monthly_expenses":
                    data = await this.exportService.exportExpenses(
                        user.id,
                        queries?.year ? +queries?.year : undefined,
                        queries?.month ? +queries?.month : undefined
                    );
                    break;
                case "tags":
                    data = await this.exportService.exportTags(user.id);
                    break;
                case "yearly_expenses":
                    data = await this.exportService.exportExpenses(
                        user.id,
                        queries?.year ? +queries?.year : undefined
                    );
                    break;
                default:
                    next(
                        ErrorService.BAD_REQUEST(
                            "Invalid export type for exporting your data."
                        )
                    );
            }

            res.setHeader(
                "Content-disposition",
                `attachment; filename=${new Date().toISOString()}-all-data-export.json`
            );
            res.setHeader("Content-type", "application/json");
            res.write(data);
            res.end();
        } catch (err) {
            next(err);
        }
    };
}
