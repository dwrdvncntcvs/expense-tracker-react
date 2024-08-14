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

    async getAll(userId: string) {
        const data = await this.model.find({ userId });

        return data.map((val) => formatData(val));
    }
    
    async remove(tagId: string) {
        const result = await this.model.deleteOne({ _id: tagId });

        if (!result.acknowledged && result.deletedCount < 1) {
            throw new Error("Tag was not deleted");
        }

        return {
            message: "Tag deleted successfully",
        };
    }
}
