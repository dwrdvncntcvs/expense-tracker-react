import { Formik, FormikState, FormikValues } from "formik";
import { FC, PropsWithChildren } from "react";

interface FormProps extends PropsWithChildren {
    onSubmit: (
        val: any,
        resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void
    ) => void;
    initialValues: FormikValues;
    validationSchema?: any;
    className?: string;
}

const Form: FC<FormProps> = ({
    children,
    onSubmit,
    initialValues,
    validationSchema,
    className,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(val, { resetForm }) => {
                onSubmit(val, resetForm);
            }}
        >
            {({ handleSubmit }) => (
                <form
                    className={className ? className : "flex flex-col gap-2"}
                    onSubmit={handleSubmit}
                >
                    {children}
                </form>
            )}
        </Formik>
    );
};

export default Form;
