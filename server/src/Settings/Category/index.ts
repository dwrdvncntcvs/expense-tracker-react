import Router from "../../utils/routes";
import CategoryController from "./controller";
import CategoryService from "./service";

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);
const router = new Router("/categories", { isAuthenticated: true });

router.createRoutes("get", "/", categoryController.allCategories, []);
router.createRoutes("post", "/", categoryController.addCategory, []);
router.createRoutes("delete", "/:id", categoryController.removeCategory, []);

export default router.routerDetails();
