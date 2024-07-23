import * as Yup from "yup";

const categoriesSchema = Yup.object().shape({
    name: Yup.string().required("Please enter a category name"),
});

export { categoriesSchema };
