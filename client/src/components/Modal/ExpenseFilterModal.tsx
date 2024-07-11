import ActionButtons from "@components/ActionButtons";
import { Form } from "@components/Form";
import Select from "@components/Form/Select";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { hide } from "@store/slices/modal";
import { useSettings } from "@store/slices/settings";
import { FC } from "react";

const ExpenseFilterModal: FC = () => {
    const dispatch = useAppDispatch();
    const { categories } = useSettings();

    return (
        <Modal name="expense-filter" title="Expense Filter...">
            <Form
                initialValues={{ categoryId: "" }}
                onSubmit={(val) => {
                    console.log("Val: ", val);
                }}
            >
                <Select
                    name="categoryId"
                    placeholder="Select Category"
                    options={categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                    }))}
                />
                <div className="flex flex-row-reverse">
                    <ActionButtons
                        rounded="xl"
                        className="px-4 py-2"
                        options={[
                            {
                                type: "button",
                                bgColor: "plain",
                                color: "primary",
                                label: "Cancel",
                                onClick: () => {
                                    dispatch(hide());
                                },
                            },
                            {
                                type: "submit",
                                bgColor: "primary",
                                color: "plain",
                                label: "Apply Filter",
                            },
                        ]}
                    />
                </div>
            </Form>
        </Modal>
    );
};

export default ExpenseFilterModal;
