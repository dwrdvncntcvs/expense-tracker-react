import UserController from "./controller";
import UserMiddleware from "./middleware";
import UserService from "./service";
import Router from "../utils/routes";
import ImageUploadMiddleware from "../middlewares/imageUpload";

const router = new Router("/users");

const userController = new UserController(new UserService());
const userMiddleware = new UserMiddleware(new UserService());
const imageMiddleware = new ImageUploadMiddleware("memory", "user-image");

router.createRoutes("post", "/sign-up", userController.signUp, [
    userMiddleware.checkAccountExistence,
]);

router.createRoutes("post", "/sign-in", userController.signIn, [
    userMiddleware.checkEmailExistence,
    userMiddleware.validatePassword,
]);

router.createRoutes("get", "/sign-out", userController.signOut, [], {
    isAuthenticated: true,
    middlewares: [userMiddleware.canAccess],
});

router.createRoutes(
    "get",
    "/is-authenticated",
    userController.isAuthenticated,
    [],
    { isAuthenticated: true }
);

router.createRoutes("get", "/:username", userController.account, [], {
    isAuthenticated: true,
    middlewares: [userMiddleware.canAccess],
});

router.createRoutes("put", "/:id", userController.updateUser, [], {
    isAuthenticated: true,
    middlewares: [userMiddleware.canAccess],
});

router.createRoutes("put", "/change/pass", userController.updatePassword, [], {
    isAuthenticated: true,
});

router.createRoutes(
    "post",
    "/add-profile-image",
    userController.uploadUserProfileImage,
    [imageMiddleware.upload("single")],
    { isAuthenticated: true }
);

export default router.routerDetails();
