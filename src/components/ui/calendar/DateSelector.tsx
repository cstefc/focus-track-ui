import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Stack, Typography} from "@mui/material";

import {nextMonth, prevMonth} from "@/lib/date";

export interface DateSelectorProps {
    date: Date;
    setDate: (newDate: Date) => void;
}

export default function DateSelector({date, setDate}: DateSelectorProps) {
    const {t} = useTranslation("general");

    const months = [
        t("calendar.months.january"),
        t("calendar.months.february"),
        t("calendar.months.march"),
        t("calendar.months.april"),
        t("calendar.months.may"),
        t("calendar.months.june"),
        t("calendar.months.july"),
        t("calendar.months.august"),
        t("calendar.months.september"),
        t("calendar.months.october"),
        t("calendar.months.november"),
        t("calendar.months.december"),
    ];

    return (
        <Stack
            direction="row" sx={{justifyContent: "space-between", alignItems: "center", p: 2}}
        >
            <Button
                variant="outlined"
                onClick={() => setDate(prevMonth(date))} sx={{fontSize: "clamp(0.6rem, 3vw, 1.5rem)"}}>
                {"<<"}
            </Button>

            <Typography variant="body1" sx={{
                px: 2,
                textAlign: "center",
                fontSize: "clamp(0.6rem, 3vw, 1.5rem)"
            }}>
                {months[date.getMonth()] + " " + date.getFullYear()}
            </Typography>

            <Button variant="outlined" sx={{fontSize: "clamp(0.6rem, 3vw, 1.5rem)"}}
                    onClick={() => setDate(nextMonth(date))}>
                {">>"}
            </Button>
        </Stack>
    );
}
