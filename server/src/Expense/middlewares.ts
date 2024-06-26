import BaseMiddleware from "../middlewares/BaseMiddleware";
import ExpenseService from "./service";

class ExpenseMiddleware extends BaseMiddleware<ExpenseService> {
    constructor(service: ExpenseService) {
        super(service);
    }
}

export default ExpenseMiddleware;
