import {themes} from "@/config/theme";
import {Box, ListItem, ListItemText, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../layout/theme/ThemeContext";

export default function ThemeBox() {
    const {t} = useTranslation("general");
    const {mode, changeMode} = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpen = (event: React.MouseEvent<HTMLLIElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <ListItem
                onClick={handleOpen}
                sx={{
                    cursor: "pointer", textTransform: "none",
                    "&:hover": {opacity: 0.8}
                }}>
                <ListItemText primary={t(`theme.${mode}`)}/>
            </ListItem>
            <Menu id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose}
                  open={Boolean(anchorEl)}>
                {Object.keys(themes).map((option) => {
                    return ((option !== mode) ?
                        <MenuItem key={option} onClick={() => {
                            changeMode(option)
                        }}>
                            {t(`theme.${option}`)}
                        </MenuItem> : null);
                })}
            </Menu>
        </Box>
    );
}
