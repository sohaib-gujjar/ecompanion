import { Avatar, Box, Divider, Grid, IconButton, Badge, ListItemIcon, Menu, MenuItem, Tooltip, Typography, MenuList } from "@mui/material";
import { Notifications as NotificationsIcon, Logout, Add as AddIcon, Settings, StoreMallDirectory, Person } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function AccountMenu() {

  const context = useContext(UserContext);

  const [user, setUser] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);


  useEffect(() => {
    if (context) {
      const user = context.user;
      if (user) {
        setUser(user)
      }
    }
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user) return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>



        <MenuItem component={NavLink} to="/">
          Home
        </MenuItem>


        <Notification />





        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="large" sx={{ ml: 2 }}>
            {/*<Avatar sx={{ fontSize: "1rem", textTransform: "uppercase" }}>{user.firstName.substr(0, 1) + '' + user.lastName.substr(0, 1)}</Avatar>*/}
            <Person sx={{ width:32, height: 32, color: "white"}} />
            <Typography style={{ padding: "0 5%", textTransform: "capitalize",color: "white",  whiteSpace: "nowrap"}}>{user.firstName + ' ' + user.lastName}</Typography>

          </IconButton>
        </Tooltip>

      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >


        <Grid container spacing={2} style={{ color: "darkblue", padding: "5% 10%" }}>
          <Grid item xs={8}>
            <h5 className="nav-user-name" style={{textTransform: "capitalize"}}>{user.firstName + ' ' + user.lastName}</h5>

            <span className="status"></span>
            <span className="ml-2">Available</span>

          </Grid>
          <Grid item xs={4}>
            {
              user.img &&

              <Avatar style={{ width: "50px", height: "50px" }} src={`http://localhost:3001/${user.img.path}`} />

            }
          </Grid>
        </Grid>

        <Box style={{ margin: "5% 0" }}>


          <MenuItem component={NavLink} to="/profile">
            <Avatar /> Profile
          </MenuItem>
          <MenuItem component={NavLink} to="/profile">
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem component={NavLink} to="/add">
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            Add workspace
          </MenuItem>
          <MenuItem component={NavLink} to="/setting">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem component={NavLink} to="/logout">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>

        </Box>
      </Menu>

    </>
  )
  else return (<></>)
}


function Notification() {
  return (
    <IconButton
      size="large"
      color="inherit"
    >
      <Badge badgeContent={1} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  )
}