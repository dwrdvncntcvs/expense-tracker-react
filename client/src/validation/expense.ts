import * as Yup from "yup";

export const expenseValidation = Yup.object().shape({
    label: Yup.string().required("Label is required"),
    purchaseDate: Yup.string().required("Purchased Date is required"),
    categoryId: Yup.string().required("Category is required"),
    amount: Yup.number()
        .typeError("Please enter number only")
        .required("Amount is required"),
});
