import {DateType} from "../model/types.ts";

export const getCurrentWeekStartDateEndDate = (): [DateType, DateType] => {
    // Get the current date
    const today = new Date();

    // Calculate the day difference to the nearest Monday
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

    // Calculate start and end dates
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + diffToMonday); // Set to Monday

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Set to Sunday

    // Format the dates as "YYYY-MM-DD"
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}` as DateType;
    };

    return [formatDate(startDate), formatDate(endDate)];
}