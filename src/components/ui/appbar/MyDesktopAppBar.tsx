import React from "react";
import {ListItem, ListItemText, Stack} from "@mui/material";
import AppBarLogo from "./logo/AppBarLogo";
import ThemeBox from "./theme-box/ThemeBox";
import LanguageBox from "./language-box/LanguageBox";
import AuthContainer from "./auth-container/AuthContainer";
import {useNavigate} from "react-router-dom";
import routes, {RouteType} from "@/config/routes";
import {getAuth} from "firebase/auth";
import {useTranslation} from "react-i18next";

export default function MyDesktopAppBar() {
    const navigate = useNavigate();
    const user = getAuth().currentUser;
    const {t} = useTranslation("general");
    const currentRoutes = routes.filter(route => route.navbar && ((user !== null) === route.protected))

    return (
        <>
            <AppBarLogo/>
            <Stack direction={"row"} sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                    {currentRoutes.map((route: RouteType) =>
                        <ListItem
                            key={route.name}
                            sx={{
                                cursor: "pointer", textTransform: "none",
                                "&:hover": {opacity: 0.8}
                            }}
                            onClick={() => navigate(route.path)}
                        >
                            <ListItemText primary={t(`routes.${route.name}`)}/>
                        </ListItem>
                    )}
                </Stack>

                <Stack direction={"row"} spacing={2} sx={{marginInlineStart: "auto"}}>
                    <LanguageBox/>
                    <ThemeBox/>
                    <AuthContainer/>
                </Stack>
            </Stack>
        </>
    );
}
