import { MONTHS, MONTHS_OBJ } from "../../variables"

export const monthLookUp = (month: number) => {
    return Object.keys(MONTHS_OBJ)[month - 1]
}