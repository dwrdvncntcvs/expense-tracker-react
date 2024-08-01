import { UserValues } from "../fixtures/pages/UserPage";

export const setUserValues = (
    value: {
        first_name: string;
        last_name: string;
        email: string;
        username: string;
    },
    options = { reverse: false }
) => {
    const updatedValues: UserValues = {
        emailField: "",
        firstNameField: "",
        lastNameField: "",
        usernameField: "",
    };

    Object.keys(value).forEach((key) => {
        const name = key
            .split("_")
            .map((_n, i) =>
                i > 0 ? `${_n.charAt(0).toUpperCase()}${_n.slice(1)}` : _n
            )
            .join("");
        if (!options.reverse)
            updatedValues[`${name}Field` as keyof UserValues] =
                key === "email"
                    ? value[key].replace("@sample", "@sample_up")
                    : `${value[key]} - UP`;
        else {
            updatedValues[`${name}Field` as keyof UserValues] =
                key === "email"
                    ? value[key].replace("@sample_up", "@sample")
                    : `${value[key]}`;
        }
    });

    return updatedValues;
};
