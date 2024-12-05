import {DateType} from "../model/types.ts";

export const getDayOfWeek = (dateString: DateType) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs', { weekday: 'long' });
}