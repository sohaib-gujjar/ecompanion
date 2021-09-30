import { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


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