import React from "react";
import {AppBar as MuiAppBar, Box, Container, Toolbar} from "@mui/material";
import MyMobileAppBar from "@/components/ui/appbar/MyMobileAppBar";
import MyDesktopAppBar from "@/components/ui/appbar/MyDesktopAppBar";

export default function MyAppBar() {
    return (
        <MuiAppBar position="fixed" sx={{height: "65px", justifyContent: "center"}}>
            <Toolbar disableGutters>
                <Container maxWidth="xl">
                    <Box sx={{display: {xs: "flex", md: "none"}}}>
                        <MyMobileAppBar/>
                    </Box>

                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        <MyDesktopAppBar/>
                    </Box>
                </Container>
            </Toolbar>
        </MuiAppBar>
    );
}
