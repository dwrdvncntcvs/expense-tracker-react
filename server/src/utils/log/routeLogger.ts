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
        console.log("");
        console.log(`--- ${this.name} ROUTES ---`);
    }

    routesPath() {
        if (this.routes.length > 0)
            this.routes.forEach(({ method, fullPath }) => {
                console.log(`${method} - ${fullPath}`);
            });
        else console.log("No Routes Found");
    }
}

export default RouteLogger;
