import userRoutes from "./User";
import expenseRoutes from "./Expense";
import categoryRoutes from "./Settings/Category";
import tagRoutes from "./Settings/Tags";
import testRoutes from "./Test";
import TrackerApp from "./app";
import { createConnection } from "./database/mongoDb";
import { MONGO_URL, PORT, ENV, ALLOWED_ORIGINS } from "./variables";

new TrackerApp({
    port: PORT,
    corsOpts: {
        credentials: true,
        origin:
            ENV === "dev" || ENV === "test"
                ? ["http://localhost:8080", "http://localhost:5173"]
                : ALLOWED_ORIGINS,
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
    .addRoute(ENV === "test" ? testRoutes : undefined)
    .addErrorHandler()
    .execute();
