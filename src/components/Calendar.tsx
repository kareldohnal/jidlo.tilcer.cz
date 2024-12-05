import {Dispatch, SetStateAction, useState} from "react";
import {getMonthNameByMonthNumber} from "../utils/getMonthNameByMonthNumber.ts";
import {getMonthToDayArray} from "../utils/getMonthToDayArray.ts";
import "./calendar.scss"
import {DateType} from "../model/types.ts";

type Props = {
    setWeekStartDateEndDate: Dispatch<SetStateAction<[DateType, DateType]>>
}

const Calendar = ({setWeekStartDateEndDate}: Props) => {
    const [displayMonth, setDisplayMonth] = useState<[number, number]>([new Date().getMonth() + 1, new Date().getFullYear()]);

    const handlePreviousMonth = () => {
        setDisplayMonth([displayMonth[0] === 1 ? 12 :displayMonth[0] - 1, displayMonth[0] === 1 ? displayMonth[1] - 1 : displayMonth[1]]);
    }

    const handleNextMonth = () => {
        setDisplayMonth([displayMonth[0] === 12 ? 1 : displayMonth[0] + 1, displayMonth[0] === 12 ? displayMonth[1] + 1 : displayMonth[1]]);
    }

    const handleWeekClick = (week: string[]) => () => {
        setWeekStartDateEndDate([week[0] as DateType, week[week.length - 1] as DateType]);
    }

    return (
        <div className={"calendar"}>
            <div className={"calendar__header"}>
                <button onClick={handlePreviousMonth}>{"<"}</button>
                <span>{`${getMonthNameByMonthNumber(displayMonth[0])} ${displayMonth[1]}`}</span>
                <button onClick={handleNextMonth}>{">"}</button>
            </div>
            <div className={"calendar__labels"}>
                <div className={"calendar__label"}>Po</div>
                <div className={"calendar__label"}>Út</div>
                <div className={"calendar__label"}>St</div>
                <div className={"calendar__label"}>Čt</div>
                <div className={"calendar__label"}>Pá</div>
                <div className={"calendar__label"}>So</div>
                <div className={"calendar__label"}>Ne</div>
            </div>
            <div className={"calendar__month"}>
                {getMonthToDayArray(displayMonth[0], displayMonth[1]).map((week, index) => {
                    return (
                        <div key={index} className={"calendar__week"} onClick={handleWeekClick(week)}>
                            {week.map((day, index) => {
                                return <div key={index} className={"calendar__day"}>{Number(day.split("-").pop())}</div>
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Calendar;