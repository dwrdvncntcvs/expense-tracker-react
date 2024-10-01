import mongoose, { model, Schema } from "mongoose";

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Tag name is required"],
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: [true, "Tag should be matched with a user"],
        },
    },
    { timestamps: true }
);

TagSchema.index({ name: "text" });

TagSchema.pre("save", async function (next) {
    // Check for existing tag
    const existingTag = await TagModel.findOne({
        name: this.name,
        userId: this.userId,
    });

    if (existingTag) {
        return next(new Error("Tag already exists"));
    }

    next();
});

const TagModel = model("Tags", TagSchema);

export default TagModel;
