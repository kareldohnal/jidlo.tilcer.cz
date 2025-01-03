import {MEALTIME} from "../model/enums.ts";

export const translateMealtime = (mealtime: MEALTIME, caseNumber?: number) => {
    switch (caseNumber) {
        case 2:
            switch (mealtime) {
                case "breakfast":
                    return "snídani";
                case "lunch":
                    return "oběd";
                case "dinner":
                    return "večeři";
                default:
                    return "";
            }
        default:
            switch (mealtime) {
                case "breakfast":
                    return "snídaně";
                case "lunch":
                    return "oběd";
                case "dinner":
                    return "večeře";
                default:
                    return "";
            }
    }
}