import { DateType } from "../model/types.ts";

export const getCurrentWeekDates = (): DateType[] => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

    // Calculate the start of the week (Monday)
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    // Generate all dates of the current week
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i); // Add i days to Monday
        return date;
    });

    // Format dates as "YYYY-MM-DD"
    const formatDate = (date: Date): DateType => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}` as DateType;
    };

    return weekDates.map(formatDate);
};