import userRoutes from "./User";
import expenseRoutes from "./Expense";
import categoryRoutes from "./Settings/Category";
import TrackerApp from "./app";
import { createConnection } from "./database/mongoDb";
import { MONGO_URL, PORT } from "./variables";

new TrackerApp({
    port: PORT,
    corsOpts: { credentials: true, origin: ["http://localhost:5173"] },
    loggerEnabled: true,
})
    .addDatabaseConnection(() => {
        createConnection(MONGO_URL);
    })
    .addRoute(userRoutes)
    .addRoute(expenseRoutes)
    .addRoute(categoryRoutes)
    .addErrorHandler()
    .execute();
