export const getMonthNameByMonthNumber = (monthNumber: number): string => {
    switch (monthNumber) {
        case 1:
            return "Leden";
        case 2:
            return "Únor";
        case 3:
            return "Březen";
        case 4:
            return "Duben";
        case 5:
            return "Květen";
        case 6:
            return "Červen";
        case 7:
            return "Červenec";
        case 8:
            return "Srpen";
        case 9:
            return "Září";
        case 10:
            return "Říjen";
        case 11:
            return "Listopad";
        case 12:
            return "Prosinec";
        default:
            return String(monthNumber)
    }
}