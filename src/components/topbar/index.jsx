import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Button,
    IconButton,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

import "./style.scss";

const Topbar = (props) => {
    const { history } = props;

    return (
        <AppBar position="static" className="topbar" sx={{ background: "#1e0b80" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => history.push("/profile")}
                    >
                        <HomeIcon />
                    </IconButton>
                </Box>
                {history.location.pathname === "/profile" ? (
                    <Button color="inherit" onClick={() => history.push("/update-profile")} >Update profile</Button>
                ) : (
                    <Button color="inherit" onClick={() => history.push("/profile")} >profile</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;
