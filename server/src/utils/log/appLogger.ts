import { Request } from "express";

class AppLogger {
    private port: number;

    constructor(PORT: number) {
        this.port = PORT;
    }

    request(req: Request) {
        console.log(
            `[${new Date().toISOString()}] - ${req.method} - ${req.originalUrl}`
        );
    }

    listener(host: string) {
        console.log(`> SERVER UP AND RUNNING ON PORT: ${this.port}`);
        console.log(`> URL: ${host}`);
    }
}

export default AppLogger;
