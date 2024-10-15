import { Option } from "@_types/elements";
import { ICreateExpense } from "@_types/expense";
import { ComboBox, Field, Form, ImageField } from "@components/Form";
import Select from "@components/Form/Select";
import Textarea from "@components/Form/Textarea";
import { useAppDispatch } from "@hooks/storeHooks";
import tagsApi, {
    useCreateTagMutation,
    useGetTagsQuery,
} from "@store/queries/tags";
import { useSettings } from "@store/slices/settings";
import { expenseValidation } from "@validation/expense";
import { FormikState } from "formik";
import {
    ChangeEvent,
    FC,
    KeyboardEventHandler,
    useEffect,
    useState,
} from "react";
import { Tag } from "@components/common";

type OnSubmit = (
    val: any,
    resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void
) => void;

interface ExpenseFormProps {
    onSubmit: OnSubmit;
    initialValues?: ICreateExpense;
    isLoading: boolean;
    editMode?: boolean;
    imageUrl?: string;
}

const ExpenseForm: FC<ExpenseFormProps> = ({
    onSubmit,
    initialValues,
    isLoading,
    editMode = false,
    imageUrl,
}) => {
    const dispatch = useAppDispatch();
    const { tags, searchTags, categories } = useSettings();

    const [tagText, setTagText] = useState<string>("");
    // debounced text
    const [_tagText, set_TagText] = useState<string>("");
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useGetTagsQuery({ search: _tagText }, { skip: !_tagText });
    const [tagMutation] = useCreateTagMutation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(tagsApi.util.invalidateTags(["expense-tags"]));
            set_TagText(tagText);
        }, 200);

        return () => clearTimeout(timeout);
    }, [tagText]);

    const handleTagChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setTagText(e.target.value);
    };

    const handleTagKeyDown: KeyboardEventHandler<HTMLInputElement> = async (
        e
    ) => {
        const tagNames = searchTags.map((val) => val.name);

        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission

            if (tagText.trim() === "") {
                return;
            }

            if (tagNames.includes(tagText)) {
                console.log("Existing");
                return;
            }

            const { data } = await tagMutation({ name: tagText });

            if (!data.data) return;

            console.log(data.data)

            setSelectedOptions((opts) => [...opts, data.data.id]);
            setTagText("");
        }
    };

    const getTag = (id: string) => {
        return tags.find((val) => id === val.id);
    };

    const tagOptions: Option[] = searchTags
        .map((val) => ({
            label: val.name,
            value: val.id,
        }))
        .filter((option) => !selectedOptions.includes(option.value));

    const categoryOptions: Option[] = categories.map((val) => {
        return {
            label: val.name,
            value: val.id,
        };
    });

    const removeTag = (id: string) => {
        setSelectedOptions((val) => val.filter((opt) => opt !== id));
    };

    return (
        <Form
            className="w-full grid grid-cols-2 gap-2 space-y-2"
            initialValues={
                initialValues || {
                    categoryId: "",
                    label: "",
                    purchaseDate: "",
                    amount: "",
                    description: "",
                    tags: [],
                }
            }
            validationSchema={expenseValidation}
            onSubmit={onSubmit}
        >
            <div className="flex flex-col col-span-2 gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="label">
                    Label
                </label>
                <Field name="label" id="label" />
            </div>
            <div className="flex flex-col col-span-2 gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="description">
                    Description
                </label>
                <Textarea name="description" id="description" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-tertiary" htmlFor="categoryId">
                    Category
                </label>
                <Select
                    name="categoryId"
                    id="categoryId"
                    options={categoryOptions}
                />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-tertiary" htmlFor="purchaseDate">
                    Purchase Date
                </label>
                <Field
                    type="date"
                    name="purchaseDate"
                    id="purchaseDate"
                    disabled={editMode}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="amount">
                    Price
                </label>
                <Field
                    name="amount"
                    id="amount"
                    icon={{ position: "start", val: "Php" }}
                    disabled={editMode}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-tertiary" htmlFor="tag">
                    Tag
                </label>
                <ComboBox
                    inputProps={{
                        placeholder: "Enter tag here...",
                        value: tagText,
                        onChange: handleTagChange,
                        onKeyDown: handleTagKeyDown,
                    }}
                    options={tagOptions}
                    name="tags"
                    selectedValues={selectedOptions}
                    setSelectedValues={(values) => {
                        setSelectedOptions(values);
                        setTagText("");
                    }}
                />
            </div>
            {selectedOptions.length > 0 && (
                <div className="flex gap-2 border border-primary col-span-2 rounded-xl p-3 flex-wrap">
                    {selectedOptions.map((val) => {
                        const tag = getTag(val)!;
                        return (
                            <Tag key={tag.id} id={tag.id} onRemove={removeTag}>
                                {tag.name}
                            </Tag>
                        );
                    })}
                </div>
            )}
            <div className="col-span-2">
                <ImageField
                    name="expense-image"
                    imageUrl={imageUrl}
                    enableRemoveImage={!editMode}
                />
            </div>
            <div className="flex w-full col-span-2 items-center justify-end">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-secondary text-white px-5 py-2 rounded-xl hover:bg-secondary/80 disabled:opacity-0 disabled:cursor-not-allowed"
                >
                    {editMode ? "Save" : "Create Expense"}
                </button>
            </div>
        </Form>
    );
};

export default ExpenseForm;
