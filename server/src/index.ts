import userRoutes from "./User";
import expenseRoutes from "./Expense";
import categoryRoutes from "./Settings/Category";
import tagRoutes from "./Settings/Tags";
import testRoutes from "./Test";
import TrackerApp from "./app";
import exportJsonRoutes from "./Export/JSON";
import importJsonRoutes from "./Import/JSON";
import { createConnection } from "./database/mongoDb";
import { MONGO_URL, PORT, ENV, ALLOWED_ORIGINS } from "./variables";

const ORIGIN =
    ENV === "dev" || ENV === "test"
        ? ["http://localhost:8080", "http://localhost:5173"]
        : ALLOWED_ORIGINS;

new TrackerApp({
    port: PORT,
    corsOpts: {
        credentials: true,
        origin: ORIGIN,
    },
    loggerEnabled: true,
})
    .addDatabaseConnection(() => {
        createConnection(MONGO_URL);
    })
    .addRoute(userRoutes)
    .addRoute(expenseRoutes)
    .addRoute(categoryRoutes)
    .addRoute(tagRoutes)
    .addRoute(exportJsonRoutes)
    .addRoute(importJsonRoutes)
    .addRoute(ENV === "test" ? testRoutes : undefined)
    .addErrorHandler()
    .execute();
