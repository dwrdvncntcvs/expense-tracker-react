import { IExpense } from "@_types/expense";
import { MONTHS } from "@common/constants";
import { capitalize, formatCurrency, formatDate } from "@common/utils/str";
import ActionButtons from "@components/ActionButtons";
import { ExpenseForm } from "@components/Expense";
import { ExpenseFilterModal } from "@components/Modal";
import { Modal } from "@components/Overlays";
import { useAppDispatch } from "@hooks/storeHooks";
import api from "@store/queries/api";
import {
    useDeleteExpenseMutation,
    useGetExpensesByMonthQuery,
    useUpdateExpenseMutation,
} from "@store/queries/expense";
import { hide, show } from "@store/slices/modal";
import { success } from "@store/slices/toast";
import { FC, Fragment, useEffect, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import {
    HiArrowLeft,
    HiArrowRight,
    HiFunnel,
    HiOutlineFunnel,
    HiOutlinePencil,
    HiOutlineTrash,
} from "react-icons/hi2";
import {
    Outlet,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";

const ExpenseMonth: FC = () => {
    const [hoveredId, setHoveredId] = useState("");

    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    searchParams.set("limit", "12");

    const { data, isLoading } = useGetExpensesByMonthQuery({
        month: params?.month
            ? MONTHS[params?.month.toUpperCase() as keyof typeof MONTHS]
            : "",
        year: params?.year || "",
        query: searchParams.toString(),
    });

    const [deleteExpenseRequest] = useDeleteExpenseMutation();

    const [updateExpenseRequest, { isLoading: isUpdateLoading }] =
        useUpdateExpenseMutation();

    useEffect(() => {
        if (
            !searchParams.get("categoryId") &&
            !data?.data?.expenses?.data &&
            !isLoading
        ) {
            dispatch(api.util.invalidateTags(["expense-months"]));
            navigate("/");
        }
    }, [searchParams, data?.data?.expenses?.data, isLoading]);

    if (isLoading) return <div>Loading ...</div>;

    const metaData = data.data.expenses.metadata;
    const totalAmount = data.data.expenses.totalAmount;
    const expenses = data.data.expenses.data as IExpense[];

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between h-10">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate("/", { replace: true })}
                        className="text-primary rounded-full h-10 w-10 flex justify-center items-center hover:border-2 hover:border-primary"
                    >
                        <HiArrowLeft size={20} />
                    </button>
                    {params?.month && (
                        <h2 className="font-bold text-3xl text-primary">
                            {capitalize(params?.month)}{" "}
                        </h2>
                    )}
                </div>
                <div className="flex gap-4 items-center">
                    {expenses && (
                        <span className="text-sm ml-2 text-gray-600 font-normal">
                            Total: {formatCurrency(totalAmount, "PHP")}
                        </span>
                    )}
                    <ActionButtons
                        rounded="full"
                        className="h-10 w-10 flex justify-center items-center"
                        options={[
                            {
                                type: "button",
                                bgColor: "secondary",
                                color: "plain",
                                icon: HiFunnel,
                                onClick: () => {
                                    dispatch(show("expense-filter"));
                                },
                            },
                            {
                                type: "button",
                                bgColor: "secondary",
                                color: "plain",
                                icon: HiTrendingUp,
                                onClick: () => {
                                    navigate(
                                        `analytics?${searchParams.toString()}`
                                    );
                                },
                            },
                        ]}
                    />
                </div>
            </div>

            {!expenses && searchParams.get("categoryId") && (
                <div className="flex flex-col h-full w-full justify-center items-center gap-4">
                    <HiOutlineFunnel size={50} className="text-primary" />
                    <h2 className="text-5xl font-bold text-primary">
                        No Expenses Found!
                    </h2>
                    <div className="flex flex-col justify-center items-center text-gray-600">
                        <p>It looks like you haven't added any expenses yet.</p>
                        <p>
                            Start by clicking the
                            <span className="font-bold text-primary">
                                "Add Expense"
                            </span>{" "}
                            button to keep track of your spending.
                        </p>
                    </div>
                </div>
            )}
            <div className="flex flex-wrap">
                {expenses &&
                    expenses?.map((expense) => {
                        const date = new Date(expense.purchaseDate);
                        return (
                            <Fragment key={expense.id}>
                                <div className="w-full xs:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 p-2">
                                    <div
                                        className="h-full shadow-md rounded-lg flex flex-col justify-between border-primary border-2 relative overflow-auto"
                                        onMouseOver={() => {
                                            if (hoveredId !== expense.id) {
                                                setHoveredId(expense.id);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (hoveredId === expense.id)
                                                setHoveredId("");
                                        }}
                                    >
                                        {hoveredId === expense.id && (
                                            <div className="w-full absolute bottom-0 flex flex-col bg-white">
                                                <button
                                                    className="bg-warning w-full p-2 py-3 text-white flex items-center justify-center hover:bg-warning/80"
                                                    onClick={() => {
                                                        dispatch(
                                                            show(
                                                                `update-expense-${expense.id}`
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <HiOutlinePencil
                                                        size={20}
                                                    />
                                                </button>
                                                <button
                                                    className="bg-failure w-full p-2 py-3 text-white flex items-center justify-center hover:bg-failure/80"
                                                    onClick={() => {
                                                        dispatch(
                                                            show(
                                                                `delete-expense-${expense.id}`
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <HiOutlineTrash size={20} />
                                                </button>
                                            </div>
                                        )}
                                        <div className="p-4 flex flex-col gap-3">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-primary text-start">
                                                    {expense.label}
                                                </h3>
                                            </div>
                                            <p className="line-clamp-4 text-xs">
                                                {expense.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 p-4 justify-between items-end">
                                            <p className="italic text-sm text-gray-600">
                                                {Intl.DateTimeFormat("en", {
                                                    dateStyle: "medium",
                                                }).format(date)}
                                            </p>

                                            <div className="flex flex-col items-end">
                                                <p className="text-lg text-secondary font-semibold">
                                                    {formatCurrency(
                                                        expense.amount.toString(),
                                                        "PHP"
                                                    )}
                                                </p>
                                                <p className="italic text-sm text-gray-600">
                                                    {expense.category.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal
                                    name={`delete-expense-${expense.id}`}
                                    title={`Delete ${expense.label}`}
                                >
                                    <p className="text-sm">
                                        Are you sure you want to delete{" "}
                                        <span className="text-primary font-bold">
                                            {expense.label}
                                        </span>
                                        ? You won't be able to undo this.
                                    </p>
                                    <div className="flex flex-row-reverse">
                                        <ActionButtons
                                            className="p-2 px-4"
                                            options={[
                                                {
                                                    type: "button",
                                                    bgColor: "primary",
                                                    color: "plain",
                                                    label: "Delete",
                                                    onClick: async () => {
                                                        await deleteExpenseRequest(
                                                            expense.id
                                                        );

                                                        dispatch(
                                                            success({
                                                                message: `${expense.label} successfully deleted.`,
                                                            })
                                                        );
                                                    },
                                                },
                                            ]}
                                        />
                                    </div>
                                </Modal>
                                <Modal
                                    name={`update-expense-${expense.id}`}
                                    title={`Edit ${expense.label}`}
                                >
                                    <ExpenseForm
                                        onSubmit={async (val) => {
                                            await updateExpenseRequest(val);
                                            dispatch(
                                                success({
                                                    message: `${val.label} successfully updated!`,
                                                })
                                            );
                                            dispatch(hide());
                                        }}
                                        editMode
                                        initialValues={{
                                            ...expense,
                                            purchaseDate: formatDate(
                                                new Date(expense.purchaseDate)
                                            )
                                                .split("/")
                                                .join("-"),
                                        }}
                                        isLoading={isUpdateLoading}
                                    />
                                </Modal>
                            </Fragment>
                        );
                    })}
            </div>
            <div className="flex gap-4 absolute bottom-28 left-1/2 -translate-x-1/2">
                <ActionButtons
                    className="w-14 h-14 flex items-center justify-center"
                    rounded="full"
                    options={[
                        {
                            type: "button",
                            bgColor: "primary",
                            color: "plain",
                            icon: HiArrowLeft,
                            disabled: !metaData.hasPrev,
                            onClick: () => {
                                if (metaData.hasPrev)
                                    setSearchParams((val) => {
                                        val.set(
                                            "page",
                                            (metaData.page - 1).toString()
                                        );
                                        return val;
                                    });
                            },
                        },
                        {
                            type: "button",
                            bgColor: "primary",
                            color: "plain",
                            icon: HiArrowRight,
                            disabled: !metaData.hasNext,
                            onClick: () => {
                                if (metaData.hasNext)
                                    setSearchParams((val) => {
                                        val.set("page", metaData.page + 1);
                                        return val;
                                    });
                            },
                        },
                    ]}
                />
            </div>
            <ExpenseFilterModal />
            <Outlet />
        </div>
    );
};

export default ExpenseMonth;
