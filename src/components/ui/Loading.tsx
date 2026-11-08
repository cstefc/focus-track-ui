import {Box, CircularProgress} from "@mui/material";
import React from "react";

export default function Loading() {
    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "70vh"}}>
            <CircularProgress/>
        </Box>
    );
}