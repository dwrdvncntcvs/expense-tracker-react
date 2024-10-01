import { RequestHandler } from "express";
import TagService from "./service";
import ErrorService from "../../utils/error";

class TagController {
    constructor(private service: TagService) {}

    addTag: RequestHandler = async (req, res, next) => {
        const user = req.user;
        const { name } = req.body;

        try {
            const data = await this.service.add({ name, userId: user.id });

            return res.status(201).send({ data });
        } catch (e) {
            const err = e as Error;
            next(ErrorService.BAD_REQUEST(err.message));    
        }
    };

    getAllTag: RequestHandler = async (req, res, next) => {
        const user = req.user;
        const { search } = req.query;   

        console.log("Search : ", search);

        try {
            const data = await this.service.getAll(user.id, search as string);

            return res.status(200).send({ data });
        } catch (e) {
            next(ErrorService.BAD_REQUEST(e as any));
        }
    };

    removeTag: RequestHandler = async (req, res, next) => {
        const { tagId } = req.params;

        try {
            const data = await this.service.remove(tagId);

            return res.status(200).send({ data });
        } catch (e) {
            next(ErrorService.BAD_REQUEST(e as any));
        }
    };
}

export default TagController;
