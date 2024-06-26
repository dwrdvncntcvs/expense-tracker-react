type ResponseMessage = string | string[];

export interface ErrorResponse {
    status: number;
    message: ResponseMessage;
    timeIssued: string;
}

class ErrorService {
    private static generateResponse(
        status: number,
        message: ResponseMessage
    ): ErrorResponse {
        return {
            status,
            message,
            timeIssued: new Date().toISOString(),
        };
    }

    static BAD_REQUEST(message: ResponseMessage) {
        return this.generateResponse(400, message);
    }

    static NOT_FOUND(message: ResponseMessage) {
        return this.generateResponse(404, message);
    }

    static INTERNAL_ERROR(message: ResponseMessage) {
        return this.generateResponse(500, message);
    }

    static UNAUTHORIZED(message: ResponseMessage) {
        return this.generateResponse(401, message);
    }

    static FORBIDDEN(message: ResponseMessage) {
        return this.generateResponse(403, message);
    }

    static JWT_INVALID_SIG(message: ResponseMessage) {
        return this.generateResponse(401, message);
    }
}

export default ErrorService;
