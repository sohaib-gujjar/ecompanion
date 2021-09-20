import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export function UserInfo() {
  return (
  <UserContext.Consumer>
    {(context) => (
      <Navigation context={context}/>
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
    console.log(props)
    console.log(context)
    console.log(sessionStorage.getItem("token"))
    if (context) {
      console.log(context)

      const user = context.user;
      if (user) {
        console.log(user.user)
        setUser(user.user)
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
      <div className="dropdown" ref={wrapperRef}>
        <a href="#" className="nav-toggle" aria-expanded="false" onClick={() => setOpenDropdown()}>
          <span className="user-avatar">{user.firstname.substr(0,1) + '' + user.lastname.substr(0,1)}</span>
          {/*<svg version="1.1" viewBox="0 0 100 100">
              <g>
                <path d="m83.898 77.398c-2.3984-13-13.699-22.5-26.898-22.5h-13.699c-13.5 0-24.898 9.8008-27.102 23.102-1.1016 6.6992 4.1016 12.699 10.801 12.699h46.199c6.8008 0 12-6.1992 10.801-12.898z"></path>
                <path d="m36.102 44.199c7.8008 7.8008 20.398 8 28.398 0.39844l0.19922-0.19922c6.8984-6.6016 7.6016-17.301 1.5-24.699-8.3008-10-23.699-9.8008-31.699 0.39844-5.6016 7.1992-5 17.5 1.5 24z"></path>
              </g>
            </svg>*/}
          <span>{user.firstname + ' ' + user.lastname}</span>
        </a>
        {
          isOpen &&
          <div className="dropdown-content">
            <div className="nav-user-info">
              <h5 className="nav-user-name">FirstName Last</h5>
              <span className="status"></span>
              <span className="ml-2">Available</span>
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