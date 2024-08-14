import Router from "../../utils/routes";
import TagController from "./controllers";
import TagService from "./service";

const tagService = new TagService();
const tagController = new TagController(tagService);
const router = new Router("/tags", { isAuthenticated: true });

router.createRoutes("get", "/", tagController.getAllTag, []);
router.createRoutes("post", "/", tagController.addTag, []);
router.createRoutes("delete", "/:tagId", tagController.removeTag, []);

export default router.routerDetails();
