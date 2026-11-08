import {useTranslation} from "react-i18next";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Stack, Typography} from "@mui/material";

interface CalendarDayProps {
    date: Date,
}

export default function DayView({date}: CalendarDayProps) {
    const {t} = useTranslation("general");
    const days: string[] = ["calendar.days.sunday", "calendar.days.monday", "calendar.days.tuesday", "calendar.days.wednesday", "calendar.days.thursday", "calendar.days.friday", "calendar.days.saturday"];
    const color = date.getDay() === 0 || date.getDay() === 6 ? "red" : "inherit"
    return (
        <Card>
            <CardContent>
                <Stack direction={"column"} spacing={1} sx={{display: "flex", alignItems: "center", justifyContent: "center", padding: 2, width: 120, height: 120}}>
                    <Typography variant={"h5"} component={"div"} color={color}>{t(days[date.getDay()])}</Typography>
                    <Typography variant={"h5"} component={"div"} color={color}>{date.getDate()}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
        ;
}