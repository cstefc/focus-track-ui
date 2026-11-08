import React from "react";
import {calendarList} from "@/lib/date";
import DayButton from "./DayButton";
import {Box} from "@mui/material";

export interface MonthViewProps {
    selected: Date;
    setSelected: ((date: Date) => void);
}

export default function MonthView({selected, setSelected}: MonthViewProps) {
    const rows: Date[][] = [];

    const days: Date[] = calendarList(selected);
    let curr: Date[] = []
    for (let i = 0; i < days.length; i++) {
        if (i > 0 && i % 7 === 0) {
            rows.push(curr);
            curr = []
        }
        curr.push(days[i]);
    }
    rows.push(curr);

    return (
        <Box sx={{display: "grid", gridTemplateColumns: "repeat(auto-fill, 1fr)", gap: "0.25rem", padding: "0.5rem", boxSizing: "border-box"}}
        >
            {rows.map((row: Date[]) => (
                <Box key={"week: " + row[0].getTime()} sx={{display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.25rem"}}>
                    {row.map((date) => (
                        <DayButton key={date.getTime()} date={date} selected={selected} setSelected={setSelected}/>
                    ))}
                </Box>
            ))}
        </Box>
    );
}