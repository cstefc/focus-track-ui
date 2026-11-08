import {Box, ListItem, ListItemText, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

export default function LanguageBox() {
    const {i18n} = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLLIElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const currentLanguage = i18n.language || "en";
    const changeLanguage = (lng: string) => {
        void i18n.changeLanguage(lng);
        handleClose();
    };

    return (
        <Box sx={{display: "flex", alignItems: "flex-start"}}>
            <ListItem
                key={currentLanguage}
                onClick={handleOpen}
                sx={{
                    cursor: "pointer", textTransform: "none",
                    "&:hover": {opacity: 0.8}
                }}
            >
                <ListItemText primary={currentLanguage.toUpperCase()} />
            </ListItem>

            <Menu id="account-menu"
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  onClick={handleClose}
                  open={Boolean(anchorEl)}>
                {Object.keys(i18n.options.resources || {})
                    .map((lng) => (
                        (lng.toUpperCase() !== currentLanguage.toUpperCase()) ?
                        <MenuItem key={lng} onClick={() => changeLanguage(lng)}>
                            {lng.toUpperCase()}
                        </MenuItem> : null
                    ))}
            </Menu>
        </Box>
    );
}
