import { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@material-ui/core";
import { PersonAdd, Settings, LocalGroceryStore } from "@material-ui/icons";

export function UserInfo() {
  return (
    <UserContext.Consumer>
      {(context) => (
        <Navigation context={context} />
      )
      }
    </UserContext.Consumer>
  )
}








export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(UserContext);

  const [isOpen, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  const wrapperRef = useRef(null);


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
      <Box className="custom-dropdown" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="User Info">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>{user.firstName.substr(0, 1) + '' + user.lastName.substr(0, 1)}</Avatar>
            <Typography className="uname" style={{ color: "white"}} sx={{ minWidth: 100 }}>{user.firstName + ' ' + user.lastName}</Typography>
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
        <MenuItem >
        <div className="nav-user-info">
              <Row>
                <Col sm={8}>
                  <h5 className="nav-user-name">{user.firstName + ' ' + user.lastName}</h5>
                  <span className="status"></span>
                  <span className="ml-2">Available</span>
                </Col>
                <Col sm={4}>{
                  user.img &&

                  <img className="chat-icon" style={{ width: "50px", height: "50px" }} src={`http://localhost:3001${user.img.path}`} />

                }</Col>
              </Row>
            </div>
        </MenuItem>
        <MenuItem>
          <Link to="/profile">Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/profile">Account</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link to="/setting">Setting</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LocalGroceryStore fontSize="small" />
          </ListItemIcon>
          <Link to="/logout">Logout</Link>
        </MenuItem>
      </Menu>
    </>
  );
  else return (
    <>
    </>
  );
}



















export function Navigation(props) {

  const context = useContext(UserContext);

  const [isOpen, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  const wrapperRef = useRef(null);


  useEffect(() => {
    if (context) {
      const user = context.user;
      if (user) {
        setUser(user)
      }
    }


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [])

  function setOpenDropdown() {
    setOpen(!isOpen)

    if (!isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  }

  function handleClickOutside(event) {
    if (wrapperRef) {
      if (wrapperRef.current)
        if (!wrapperRef.current.contains(event.target)) {
          setOpen(false)
          document.removeEventListener('mousedown', handleClickOutside);
        }
    }
  }


  if (user)
    return (
      <div className="custom-dropdown" ref={wrapperRef}>
        <a href="#" className="nav-toggle" aria-expanded="false" onClick={() => setOpenDropdown()}>
          <span className="user-avatar">{user.firstName.substr(0, 1) + '' + user.lastName.substr(0, 1)}</span>
          <span className="uname">{user.firstName + ' ' + user.lastName}</span>
        </a>
        {
          isOpen &&
          <div className="dropdown-content">
            <div className="nav-user-info">
              <Row>
                <Col sm={8}>
                  <h5 className="nav-user-name">{user.firstName + ' ' + user.lastName}</h5>
                  <span className="status"></span>
                  <span className="ml-2">Available</span>
                </Col>
                <Col sm={4}>{
                  user.img &&

                  <img className="chat-icon" style={{ width: "50px", height: "50px" }} src={`http://localhost:3001${user.img.path}`} />

                }</Col>
              </Row>
            </div>
            <Link to="/profile">Profile</Link>
            <Link to="/setting">Setting</Link>
            <Link to="/logout">Log out</Link>
          </div>
        }
      </div>
    )
  else return (
    <>
    </>
  );
}