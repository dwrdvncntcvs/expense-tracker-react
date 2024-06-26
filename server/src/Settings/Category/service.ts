import { formatData } from "../../database/mongoDb";
import { CreateCategory } from "../../types/Settings/Category/category";
import CategoryModel from "./model";

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
}

export default CategoryService;
