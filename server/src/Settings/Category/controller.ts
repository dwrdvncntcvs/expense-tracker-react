import { RequestHandler } from "express";
import CategoryService from "./service";
import { CreateCategory } from "../../types/Settings/Category/category";
import ErrorService from "../../utils/error";

class CategoryController {
    constructor(private service: CategoryService) {}

    allCategories: RequestHandler = async (req, res, next) => {
        const user = req.user;

        const data = await this.service.all(user.id);

        return res.status(200).send({ data });
    };

    removeCategory: RequestHandler = async (req, res, next) => {
        const { id } = req.params;

        try {
            const data = await this.service.remove(id);

            return res.status(200).send({ data });
        } catch (e) {
            next(ErrorService.BAD_REQUEST(e as any));
        }
    };

    addCategory: RequestHandler = async (req, res, next) => {
        const user = req.user;
        const { name } = req.body;

        const categoryData: CreateCategory = {
            name,
            userId: user.id,
        };

        try {
            const data = await this.service.create(categoryData);

            return res.status(200).send({ data });
        } catch (err) {
            next(ErrorService.BAD_REQUEST(err as any));
        }
    };
}

export default CategoryController;
