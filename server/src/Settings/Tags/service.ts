import { formatData } from "../../database/mongoDb";
import { ICreateTag, IUpdateTag } from "../../types/Settings/Category/tag";
import TagModel from "./model";

export default class TagService {
    private model: typeof TagModel;

    constructor() {
        this.model = TagModel;
    }

    async add(tag: ICreateTag) {
        const data = await this.model.create(tag);

        return formatData(data);
    }

    async addBulk(tags: ICreateTag[]) {
        const data = await this.model.create(...tags);
        return data.map((tag) => formatData(tag));
    }

    async getAll(userId: string, search?: string) {
        const data = await this.model.find({
            userId,
            name: { $regex: search || "", $options: "i" },
        });

        return data.map((val) => formatData(val));
    }

    async remove(tagId: string) {
        const result = await this.model.findByIdAndDelete({ _id: tagId });

        if (!result) {
            throw new Error("Tag was not deleted");
        }

        return {
            message: "Tag deleted successfully",
            id: result.id,
        };
    }
}
