import {DateType} from "../model/types.ts";

export const getMonthToDayArray = (month: number, year: number): DateType[][] => {
    // Initialize the weeks array
    const weeks: DateType[][] = [];

    // Create date objects for the first and last day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    // Get total days in the month
    const daysInMonth = lastDayOfMonth.getDate();

    // Determine the day of the week for the 1st day (Monday = 1, Sunday = 7)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;

    // Calculate the starting day number (could be from the previous month)
    let currentDay = 1 - (firstDayOfWeek - 1);

    // Generate weeks
    while (currentDay <= daysInMonth) {
        const week: DateType[] = [];

        for (let i = 0; i < 7; i++) {
            // Determine the date for the current cell
            const date = new Date(year, month - 1, currentDay);

            // Format date as YYYY-MM-DD
            week.push(date.toISOString().split("T")[0] as DateType);

            currentDay++;
        }

        weeks.push(week);
    }

    return weeks;
};