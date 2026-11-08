import {Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function AppBarLogo() {
    const navigate = useNavigate();

    return (
        <Box sx={{display: "flex", alignItems: "center", cursor: "pointer",
                 marginRight: "16px",
                 "&:hover": {opacity: 0.8}}} onClick={() => navigate("/")}
        >
            {/** <Avatar
             src="/FocusTrackLogo_600x600.jpg"
             alt={t("pictures.logoAltText")}
             sx={{width: 50, height: 50, mr: 1}}
             /> */}

            <Typography variant="h5" component="span" sx={{fontWeight: "bold"}}>
                Focus Track
            </Typography>
        </Box>
    );
}
