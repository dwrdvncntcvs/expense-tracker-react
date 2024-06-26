import mongoose, { Document, Types } from "mongoose";

const createConnection = async (databaseUrl: string) => {
    try {
        const connectionData = await mongoose.connect(databaseUrl, {});
        mongoose.set({ strictQuery: true });
        console.log(
            `> Database connection established: ${connectionData.connection.name}`
        );
        return connectionData;
    } catch (err) {
        console.log(`Cannot Connect to "${databaseUrl}"`);
        console.log((err as Error).message);
    }
};

const formatData = <T>(
    data:
        | (Document<unknown, {}, T> &
              T & {
                  _id: Types.ObjectId;
              })
        | null
) => {
    if (!data) return null;
    const transformedData = data.toObject({
        versionKey: false,
        transform(_doc, ret, _options) {
            const newData = { id: ret._id, ...ret };
            return newData;
        },
    });
    delete transformedData._id;
    return transformedData as T;
};

export { createConnection, formatData };
