import ActionButtons from "@components/ActionButtons";
import { Form } from "@components/Form";
import Select from "@components/Form/Select";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { hide } from "@store/slices/modal";
import { useSettings } from "@store/slices/settings";
import { FC } from "react";
import { HiArrowPath } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const ExpenseFilterModal: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();
    const { categories } = useSettings();

    return (
        <Modal name="expense-filter" title="Expense Filter...">
            <Form
                initialValues={{
                    categoryId: searchParams.get("categoryId") || "",
                }}
                onSubmit={async (val) => {
                    setSearchParams((prev) => {
                        if (val.categoryId)
                            prev.set("categoryId", val.categoryId);
                        else prev.delete("categoryId");

                        return prev;
                    });
                    dispatch(hide());
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
                        className="px-4 py-2 h-10"
                        options={[
                            {
                                type: "button",
                                bgColor: "quaternary",
                                color: "primary",
                                label: "Cancel",
                                onClick: () => {
                                    dispatch(hide());
                                },
                            },
                            {
                                type: "button",
                                bgColor: "quaternary",
                                color: "primary",
                                icon: HiArrowPath,
                                onClick: () => {
                                    setSearchParams((prev) => {
                                        prev.forEach((_, key) => {
                                            prev.delete(key);
                                        });

                                        return prev;
                                    });
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
