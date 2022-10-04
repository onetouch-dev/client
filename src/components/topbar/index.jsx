import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Toolbar, Button, IconButton } from "@mui/material";

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
                    <Button color="inherit" onClick={() => history.push("/change-password")} >Change Password</Button>
                ) : (
                    <Button color="inherit" onClick={() => history.push("/profile")} >profile</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;
