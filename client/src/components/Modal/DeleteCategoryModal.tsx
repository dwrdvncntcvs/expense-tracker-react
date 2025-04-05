import ActionButtons from "@components/ActionButtons";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import { useCheckCategoryUsageQuery, useDeleteCategoryMutation } from "@store/queries/categories";
import { success } from "@store/slices/toast";
import { FC } from "react";

interface DeleteCategoryModalProps {
    categoryId: string;
    categoryName: string;
}

const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({ categoryId, categoryName }) => {
    const dispatch = useAppDispatch();
    const [deleteCategoryRequest] = useDeleteCategoryMutation();

    const { data, isLoading } = useCheckCategoryUsageQuery(categoryId)

    const handleDeleteCategory =
        async (id: string, name: string) => {
            await deleteCategoryRequest(id);
            dispatch(
                success({
                    message: `Successfully deleted ${name}`,
                })
            );
        }

    return <Modal name="delete-category" title={`Delete ${categoryName}?`}>
        <div className="space-y-4">
            {data?.data.isUsed ?
                <p className="text-sm text-black/80">You won't be able to delete this category because it is used in other expenses.</p> :
                <>
                    <p className="text-sm text-black/80">Are you sure you want to delete this category?</p>
                    <div className="flex flex-row-reverse gap-2">
                        <ActionButtons
                            className="p-4 py-2 self-end"
                            options={[{
                                label: "Delete",
                                onClick: () => handleDeleteCategory(categoryId, categoryName),
                                type: "button",
                                disabled: isLoading,
                                bgColor: "failure",
                                color: "plain",
                            }]} />
                    </div>
                </>}
        </div>
    </Modal>;
};

export default DeleteCategoryModal;


