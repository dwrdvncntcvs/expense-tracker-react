import Router from "../../utils/routes";

const router = new Router("/import", { isAuthenticated: true });

router.createRoutes("post", "/json", () => {}, []);

export default router.routerDetails();
