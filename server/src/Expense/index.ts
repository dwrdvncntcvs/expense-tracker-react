import ImageUploadMiddleware from "../middlewares/imageUpload";
import Router from "../utils/routes";
import ExpenseController from "./controller";
import ExpenseMiddleware from "./middlewares";
import ExpenseService from "./service";

const expenseController = new ExpenseController(new ExpenseService());
const expenseMiddleware = new ExpenseMiddleware(new ExpenseService());
const imageMiddleware = new ImageUploadMiddleware("memory", "expense-image");

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
router.createRoutes("get", "/:id", expenseController.getExpense, []);
router.createRoutes("post", "/", expenseController.addExpense, [
    imageMiddleware.upload("single"),
]);
router.createRoutes("put", "/:expenseId", expenseController.putExpense, [
    imageMiddleware.upload("single"),
]);
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

router.createRoutes(
    "get",
    "/per-categories/year/:year/analytics",
    expenseController.getExpenseYearlyAnalyticsPerCategories,
    []
);

export default router.routerDetails();
