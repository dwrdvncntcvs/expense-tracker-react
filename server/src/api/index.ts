import TrackerApp from "../app";
import { createConnection } from "../database/mongoDb";
import { ALLOWED_ORIGINS, ENV, MONGO_URL, PORT } from "../variables";
import userRoutes from "../User";
import expenseRoutes from "../Expense";
import testRoutes from "../Test";
import categoryRoutes from "../Settings/Category";

console.log("ENV: ", ENV);
console.log("ALLOWED_ORIGIN: ", ALLOWED_ORIGINS);

new TrackerApp({
    port: PORT,
    corsOpts: {
        credentials: true,
        origin:
            ENV === "dev"
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
    .addRoute(ENV === "test" ? testRoutes : undefined)
    .addErrorHandler()
    .execute();
