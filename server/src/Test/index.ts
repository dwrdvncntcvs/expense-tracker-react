import Expense from "../Expense/model";
import ExpenseService from "../Expense/service";
import UserService from "../User/service";
import ErrorService from "../utils/error";
import Router from "../utils/routes";
import mongoose from "mongoose";
import { MONTHS } from "../variables";

const router = new Router("/test");
const userService = new UserService();
const expenseService = new ExpenseService();

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

router.createRoutes(
    "post",
    "/delete-user",
    async (req, res, next) => {
        const { email } = req.body;
        try {
            const user = await userService.findByEmail(email);

            if (!user) return next(ErrorService.NOT_FOUND("User not found"));

            await userService.deleteUser(user.id);

            return res.status(200).send({ message: "User removed" });
        } catch (err) {
            next(ErrorService.BAD_REQUEST(err as string));
        }
    },
    []
);

router.createRoutes(
    "delete",
    "/expenses/:month/:year",
    async (req, res, next) => {
        const { month, year } = req.params;

        try {
            await Expense.deleteMany({
                purchaseDate: {
                    $gte: new Date(+year, +month - 1, 1),
                    $lt: new Date(+year, +month, 1),
                },
            });

            return res
                .status(200)
                .send(
                    `Delete expenses for month ${
                        MONTHS[+month - 1]
                    } of year ${year}`
                );
        } catch (err) {
            next(ErrorService.BAD_REQUEST(err as string));
        }
    },
    []
);

export default router.routerDetails();
