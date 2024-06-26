import UserController from "./controller";
import UserMiddleware from "./middleware";
import UserService from "./service";
import Router from "../utils/routes";

const router = new Router("/users");

const userController = new UserController(new UserService());
const userMiddleware = new UserMiddleware(new UserService());

router.createRoutes("post", "/sign-up", userController.signUp, [
    userMiddleware.checkAccountExistence,
]);

router.createRoutes("post", "/sign-in", userController.signIn, [
    userMiddleware.checkEmailExistence,
    userMiddleware.validatePassword,
]);

router.createRoutes("get", "/sign-out", userController.signOut, [], { isAuthenticated: true, middlewares: [userMiddleware.canAccess] })

router.createRoutes("get", "/isAuthenticated", userController.isAuthenticated, [], { isAuthenticated: true })

router.createRoutes("get", "/:username", userController.account, [], {
    isAuthenticated: true,
    middlewares: [userMiddleware.canAccess],
});



export default router.routerDetails();
