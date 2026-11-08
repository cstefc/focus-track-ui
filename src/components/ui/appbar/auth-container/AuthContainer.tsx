import React, {useEffect, useState} from "react";
import {Box, Menu} from "@mui/material";
import AuthContainerTitle from "./AuthContainerTitle";
import AuthContainerGoogleLogin from "./AuthContainerGoogleLogin";
import AuthContainerGoogleLogout from "./AuthContainerGoogleLogout";
import {getAuth, signInWithPopup, signOut, User} from "firebase/auth";
import {Providers} from "@/config/firebase";
import {useNavigate} from "react-router-dom";

export default function AuthContainer() {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(auth.currentUser);
    useEffect(() => {
        return auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, [auth]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        setAnchorEl(null);
    }

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const handleSignInWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithPopup(getAuth(), Providers.google)
            navigate("/")
            setLoading(false);
        } catch (error) {
            console.error("Google sign-in failed:", error)
        }
    }
    const handleSignOutWithGoogle = async () => {
        setLoading(true);
        try {
            navigate("/login")
            await signOut(getAuth());
            setLoading(false);
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <Box
                onClick={handleOpen}
                sx={{
                    cursor: "pointer",
                    "&:hover": {opacity: 0.8}
                }}
            >
                <AuthContainerTitle user={user}/>
            </Box>

            <Menu id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose} open={Boolean(anchorEl)}>
                <AuthContainerGoogleLogout hidden={loading || !user} handleLogout={handleSignOutWithGoogle}/>
                <AuthContainerGoogleLogin hidden={loading || user !== null} handleLogin={handleSignInWithGoogle}/>
            </Menu>
        </Box>
    );
}
