import ExpenseService from "../../Expense/service";
import CategoryService from "../../Settings/Category/service";
import TagService from "../../Settings/Tags/service";
import UserService from "../../User/service";
import Router from "../../utils/routes";
import ExportController from "./controller";
import ExportService from "./service";

const router = new Router("/export/json", { isAuthenticated: true });
const exportService = new ExportService(
    new UserService(),
    new ExpenseService(),
    new CategoryService(),
    new TagService()
);
const exportController = new ExportController(exportService);

router.createRoutes("post", "/:method_type", exportController.exportData, []);

export default router.routerDetails();
