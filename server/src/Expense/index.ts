import Router from "../utils/routes";
import ExpenseController from "./controller";
import ExpenseService from "./service";
import ExpenseMiddleware from "./middlewares";

const expenseController = new ExpenseController(new ExpenseService());
const expenseMiddleware = new ExpenseMiddleware(new ExpenseService());

const router = new Router("/expenses", {
    isAuthenticated: true,
    // middlewares: [expenseMiddleware.canAccess],
});

router.createRoutes("get", "/", expenseController.allMonths, []);
router.createRoutes("get", "/:month/:year", expenseController.expenses, []);
router.createRoutes(
    "get",
    "/type/:expenseType/:month",
    expenseController.expensesType,
    []
);
router.createRoutes("post", "/", expenseController.addExpense, []);
router.createRoutes("put", "/:expenseId", expenseController.putExpense, []);
router.createRoutes(
    "delete",
    "/:expenseId",
    expenseController.deleteExpense,
    []
);

router.createRoutes(
    "get",
    "/:month/:year/analytics",
    expenseController.getExpenseMonthAnalytics,
    []
);

router.createRoutes(
    "get",
    "/all/year/:year/analytics",
    expenseController.getExpenseYearlyAnalytics,
    []
);

export default router.routerDetails();
