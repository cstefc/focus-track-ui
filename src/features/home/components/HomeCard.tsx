import React from "react";
import {useTranslation} from "react-i18next";

import {Box, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface HomeCardProps {
    card: string
}

export default function HomeCard({card}: HomeCardProps) {
    const {t} = useTranslation("home");

    return (
        <Card sx={{height: "320px", width: "320px", margin: "50px"}}>
            <CardContent component={Box} sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                    <Typography gutterBottom variant="h5" component="div">{t(`cards.${card}.title`)}</Typography>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Typography variant="body1">{t(`cards.${card}.text`)}</Typography>
                    </Box>
            </CardContent>
        </Card>
    );
}