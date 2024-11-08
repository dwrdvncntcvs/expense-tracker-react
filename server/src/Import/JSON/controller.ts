import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import ErrorService from "../../utils/error";

export default class ImportController {
    constructor(private importService: any) {}
}
