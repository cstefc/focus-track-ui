import MonthView from "./MonthView";
import React from "react";
import DateSelector from "./DateSelector";
import {Box} from "@mui/material";

export interface CalendarViewProps {
    date: Date;
    setDate: (date: Date) => void;
}

export default function Calendar({date, setDate}: CalendarViewProps) {
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <DateSelector date={date} setDate={setDate}/>
            <MonthView selected={date} setSelected={setDate}/>
        </Box>
    );
}