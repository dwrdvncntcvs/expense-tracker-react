import { formatData } from "../../database/mongoDb";
import { CreateCategory } from "../../types/Settings/Category/category";
import CategoryModel from "./model";
import mongoose from "mongoose";

class CategoryService {
    private model: typeof CategoryModel;

    constructor() {
        this.model = CategoryModel;
    }

    async all(userId: string) {
        const data = await this.model.find({ userId });
        return data.map((categories) => formatData(categories));
    }

    async create({ name, userId }: CreateCategory) {
        const data = await this.model.create({ name, userId });
        return formatData(data);
    }

    async remove(id: string) {
        const data = await this.model.findByIdAndDelete({ _id: id });
        return formatData(data);
    }

    async isCategoryUsed(categoryId: string) {
        const result = await this.model.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(categoryId),
                },
            },
            {
                $lookup: {
                    from: "expenses",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "expenses",
                },
            },
            {
                $project: {
                    isUsed: { $gt: [{ $size: "$expenses" }, 0] },
                },
            },
        ]);

        return result[0]?.isUsed || false;
    }
}

export default CategoryService;
