import {Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import DayView from "@/components/ui/day-view/DayView";
import Calendar from "@/components/ui/calendar/Calendar";

export default function PlanningScreen() {
    const [date, setDate] = useState(() => new Date());

    return (
        <Stack direction={"row"} sx={{display: "flex", justifyContent: "center"}}>
            {/* Left Column */}
            <Typography variant="h5" sx={{m: 4}}>
                TODO: Add overview month stats
            </Typography>


            {/* Center Calendar Column */}
            <Stack direction={"column"} sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 2}}>
                <DayView date={date}/>
                <Calendar date={date} setDate={setDate}/>
            </Stack>

            {/* Right Column */}
            <Typography variant="h5" sx={{m: 4}}>
                TODO: Add overview day stats
            </Typography>
        </Stack>
    );
}
