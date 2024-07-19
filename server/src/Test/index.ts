import ErrorService from "../utils/error";
import Router from "../utils/routes";
import mongoose from "mongoose";

const router = new Router("/test");

router.createRoutes(
    "post",
    "/clean-up",
    async (req, res, next) => {
        try {
            await mongoose.connection.dropDatabase();
            return res
                .status(200)
                .send({ message: "mongodb test database dropped" });
        } catch (err) {
            console.log(err);
            next(ErrorService.BAD_REQUEST(err as string));
        }
    },
    []
);

export default router.routerDetails();
