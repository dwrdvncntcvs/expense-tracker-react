import { IRoutes, Route } from "../../types/routes";

class RouteLogger {
    private name: string;
    private routes: Route[];

    constructor(routesJson: IRoutes) {
        const [name, routes] = routesJson;
        this.name = name;
        this.routes = routes;
    }

    routeName() {
        console.log(`${this.name} ROUTES`);
    }

    routesPath() {
        this.routes.forEach(({ method, fullPath }) => {
            console.log(`${method} - ${fullPath}`);
        });
    }
}

export default RouteLogger;
