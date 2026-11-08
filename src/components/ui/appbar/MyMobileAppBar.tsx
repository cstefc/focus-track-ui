import React from "react";
import {Box, Drawer, IconButton, List, ListItem, ListItemText, Stack} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBarLogo from "./logo/AppBarLogo";
import ThemeBox from "./theme-box/ThemeBox";
import LanguageBox from "./language-box/LanguageBox";
import AuthContainer from "./auth-container/AuthContainer";
import {useNavigate} from "react-router-dom";
import routes, {RouteType} from "@/config/routes";
import {getAuth} from "firebase/auth";
import {useTranslation} from "react-i18next";

export default function MyMobileAppBar() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const user = getAuth().currentUser;
    const {t} = useTranslation("general");
    const currentRoutes = routes.filter(route => route.navbar && ((user !== null) === route.protected))

    return (
        <>
            <Box sx={{display: {xs: "flex", md: "none"}}}>
                <IconButton color="inherit" onClick={() => setOpen(!open)}>
                    <MenuIcon/>
                </IconButton>
            </Box>

            {<AppBarLogo/>}

            <Drawer open={open} onClose={() => setOpen(false)}>
                <Box sx={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                    <List>
                        {currentRoutes.map((route: RouteType) =>
                            <ListItem
                                key={route.name}
                                color="inherit"
                                onClick={() => navigate(route.path)}
                                sx={{
                                    cursor: "pointer", textTransform: "none",
                                    "&:hover": {opacity: 0.8}
                                }}
                            >
                                <ListItemText primary={t(`routes.${route.name}`)}/>
                            </ListItem>
                        )}
                    </List>

                    <Box sx={{paddingTop: "auto"}}>
                        <LanguageBox/>
                        <ThemeBox/>
                    </Box>
                </Box>
            </Drawer>

            <Stack direction={"row"} sx={{marginInlineStart: "auto", display: {md: "none"}}}>
                <AuthContainer/>
            </Stack>
        </>
    );
}
