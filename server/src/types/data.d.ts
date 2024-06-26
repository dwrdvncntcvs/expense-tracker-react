export type MongooseData<T> = (Document<unknown, {}, T> &
    T & {
        _id: Types.ObjectId;
    })