import { FC } from "react";
import { Modal } from "@components/Overlays";
import { HiPlus } from "react-icons/hi2";
import { useAppDispatch } from "@hooks/storeHooks";
import { show } from "@store/slices/modal";

const CreateExpense: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <>
            <button
                onClick={() => dispatch(show("add-expense"))}
                className="fixed bottom-10 right-10 text-white bg-primary p-4 rounded-full hover:bg-primary/80 transition-all"
            >
                <HiPlus size={40} />
            </button>
            <Modal title="Add Expense" name="add-expense">
                Hello?
            </Modal>
        </>
    );
};

export default CreateExpense;
