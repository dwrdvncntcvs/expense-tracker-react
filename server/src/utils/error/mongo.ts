import { Error } from "mongoose";

interface ValidationErr {
    [key: string]: string;
}

const handleValidationError = (validationError: Error.ValidationError) => {
    let errors: ValidationErr = {};

    if (validationError.name === "ValidationError") {
        Object.keys(validationError.errors).forEach((key) => {
            errors[key] = validationError.errors[key].message;
        });

        return errors;
    }

    return errors;
};

export { handleValidationError };
