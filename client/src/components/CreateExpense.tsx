import { FC } from "react";
import { Modal } from "./Overlays";
import { useModal } from "../contexts/Modal";
import { HiPlus } from "react-icons/hi2";

const CreateExpense: FC = () => {
    const { show } = useModal();

    return (
        <>
            <button
                onClick={() => show("add-expense")}
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