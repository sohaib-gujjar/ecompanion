import { Search } from "@mui/icons-material";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccountMenu from "./AccountMenu";
import { NavLink } from "react-router-dom";

export default function DashboardHeader() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#350d36"}}>
                <Toolbar variant="dense">
                    {/*<IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>*/}
                    <Avatar sx={{ margin: "15px 0"}} src="favicon.ico" component={NavLink} to="/" />
                    <Typography variant="h5" color="inherit" component="div" style={{ marginLeft: "10px", flexGrow: 1 }}>
                        E Companion
                    </Typography>
                    <IconButton size="large" aria-label="search" color="inherit">
                        <Search />
                    </IconButton>

                    <AccountMenu />
                </Toolbar>
            </AppBar>
        </Box>
    )
}