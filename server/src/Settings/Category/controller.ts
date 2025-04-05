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
            const error = JSON.parse(JSON.stringify(err));

            if (error.code === 11000)
                next(
                    ErrorService.BAD_REQUEST(
                        `${error.keyValue.name} already exists`
                    )
                );
            else next(ErrorService.BAD_REQUEST(error));
        }
    };

    checkCategoryUsage: RequestHandler = async (req, res, next) => {
        const { id } = req.params;

        try {
            const isUsed = await this.service.isCategoryUsed(id);
            return res.status(200).send({ data: { isUsed } });
        } catch (e) {
            next(ErrorService.BAD_REQUEST(e as any));
        }
    };
}

export default CategoryController;
