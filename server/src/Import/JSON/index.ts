import ExpenseService from "../../Expense/service";
import FileUploadMiddleware from "../../middlewares/fileUpload";
import FileService from "../../services/fileService";
import CategoryService from "../../Settings/Category/service";
import TagService from "../../Settings/Tags/service";
import UserService from "../../User/service";
import Router from "../../utils/routes";
import ImportController from "./controller";
import ImportService from "./service";

const fileMiddleware = new FileUploadMiddleware("memory", "json");
const fileService = new FileService();

const router = new Router("/import", { isAuthenticated: true });
const importService = new ImportService(
    new UserService(),
    new ExpenseService(),
    new CategoryService(),
    new TagService()
);

const importController = new ImportController(importService, fileService);

router.createRoutes("post", "/json", importController.importFileReq, [
    fileMiddleware.upload("single"),
]);

export default router.routerDetails();
