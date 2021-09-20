import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Router } from "react-router-dom";

const UserContext = createContext();

function UserProvider(props) {

    const [contextState, setContextState] = useState({
        isSignIn: false,
        user: null
    });

    useEffect(() => {
        console.log(contextState)
        if (!contextState.isSignIn) {
            
            const token = sessionStorage.getItem('token');
            console.log(token)

            if (token && token !== undefined && token !== 'undefined') {
                alert('token' + token)
                const tokenData = parseJWT(token);
                console.log(tokenData)
                if (tokenData.user) {
                    setSignIn(true)
                    setUserContext(tokenData.user)
                }
            }
        }
    });

    function parseJWT(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(
            decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            )
        );
    }


    function setSignIn(isSignIn) {
        console.log("setSignIn", isSignIn)
        setContextState({
            isSignIn: isSignIn
        });
    }

    function setUserContext(user) {
        console.log("setUserContext", user)

        sessionStorage.setItem('token', JSON.stringify(user.token));
        
        document.cookie = 'token' + '=' + user.token + ';' + 60000 + ';';

        setContextState({
            isSignIn: true,
            user: user
        });
    }

    function removeUserContext() {
        console.log("removeUserContext")

        sessionStorage.removeItem('token');
        Cookies.remove('token')

        setContextState({
            isSignIn: false,
            user: null
        })
        window.location.href = "/"
    }

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { setUserContext: setUserContext });
        }
        return child;
    });

    return (
        <>
            <UserContext.Provider
                value={{
                    isSignIn: contextState.isSignIn,
                    user: contextState.user,
                    setUserContext: setUserContext,
                    removeUserContext: removeUserContext,
                    setSignIn: setSignIn,
                }}
            >
                {childrenWithProps}
            </UserContext.Provider>
        </>
    )
}


const AuthenticationRoute = ({ component: Component, ...routerProps }) => (
    <UserContext.Consumer>
        {({ isSignIn }) => {

            if (isSignIn) {
                return <Router
                    render={props => (
                        <Component {...props} />
                    )}
                    {...routerProps}
                />
            } else {
                window.location = "/signin";
            }
        }}
    </UserContext.Consumer>
);

export { UserProvider, UserContext, AuthenticationRoute }