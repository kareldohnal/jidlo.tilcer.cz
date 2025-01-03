import {DateType} from "../model/types.ts";

export const getFormatedDate = (dateString: DateType) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs', { day: 'numeric', month: "numeric", year: "numeric" });
}