import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Button, Dropdown, FormControl, ButtonGroup } from "react-bootstrap";
import Header from "../component/Header";
import '../styles/dashboard.scss';
import _ from 'lodash';
import { UserContext } from '../context/UserContext';
import '../styles/emoji.scss';

export default function Dashboard() {

    const context = useContext(UserContext);


    const [contacts, setContacts] = useState([{ name: "Lorem ipsum", id: 1 }, { name: "Ipsum Lorem", id: 2 }]);
    let [teamsJoined, setTeamsJoined] = useState([{ name: "Team 1", id: 1 }, { name: "Team2", id: 2 }]);
    let [workspace, setWorkspace] = useState([{ name: "Channel 1", id: 1 }, { name: "Channel 2", id: 2 }]);

    const [messages, setMessages] = useState({});

    /*************************************************         */
    const getWorkspaces = useCallback(async (user) => {
        fetch("http://localhost:3001/slack/getUserWorkspace/" + user, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                setWorkspace(res)
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }, [])

    const getUserTeams = (user) => {
        fetch("http://localhost:3001/slack/getUserTeams/" + user, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                setTeamsJoined(res)
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }
    const getUserDirectChats = (user) => {
        fetch("http://localhost:3001/slack/getUserDirectChats/" + user, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                setContacts(res)
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }
    /**************************************************          */


    useEffect(() => {
        if (context) {
            if (context.user) {
                const current_user = context.user.user.email;

                getWorkspaces(current_user)
                getUserTeams(current_user)
                getUserDirectChats(current_user)

                return;
            }
            else {
                window.location.href = "/signin";
            }
        }

    }, []);

    function onContactChange(e, d) {
        const current_user = context.user.user.id;
        fetch("http://localhost:3001/slack/getDM/" + current_user + "/" + d.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                setMessages({ contact: d, messages: res })
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }
    function onTeamChange(e, d) {
        fetch("http://localhost:3001/slack/getTeamsChat/" + d.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                setMessages({ team: d, messages: res })
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }
    function onChannelChange(e, d) {
        fetch("http://localhost:3001/slack/getWorkspaceChat/" + d.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                setMessages({ workspace: d, messages: res })
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }

    /*************************************************         */

    const sendMessage = useCallback(async (message, text) => {
        if (message.contact) {
            const body = {
                text: text,
                sender: context.user.user,
                receiver: message.contact
            }
            sendDirectMessage(body)
        }
        else if (message.team) {
            const body = {
                text: text,
                user: context.user.user,
                teams: message.team
            }
            sendTeamsMessage(body)
        }
        else if (message.workspace) {
            const body = {
                text: text,
                user: context.user.user,
                workspace: message.workspace
            }
            sendWorkspaceMessage(body);
        }
    })


    const sendWorkspaceMessage = useCallback(async (body) => {
        fetch("http://localhost:3001/slack/workspaceMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => { if (response.status === 200) { response.json() } else throw response.json() })
            .then(res => {
                onChannelChange(null, body.workspace)
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }, [])

    const sendTeamsMessage = (body) => {
        fetch("http://localhost:3001/slack/teamsMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => { if (response.status === 200) { response.json() } else throw response.json() })
            .then(res => {
                onTeamChange(null, body.teams)
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }
    const sendDirectMessage = (body) => {
        fetch("http://localhost:3001/slack/userMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => { if (response.status === 200) { response.json() } else throw response })
            .then(res => {
                /*let message = _.clone(messages);
                message.messages.push({

                })
                setMessages(message)*/
                onContactChange(null, body.receiver)

            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }
    /**************************************************          */

    return (
        <Container className="slack-window" >
            <Row>
                <Header />
            </Row>
            <Row style={{ height: "90vh", marginTop: 0, marginBottom: 0 }}>
                <Col sm={3} md={3} lg={3} className="slack-user-window">
                    <TeamsAndContacts
                        contacts={contacts}
                        channelJoined={workspace}
                        teamsJoined={teamsJoined}
                        onTeamChange={onTeamChange}
                        onChannelChange={onChannelChange}
                        onContactChange={onContactChange}
                    />
                </Col>
                <Col sm={9} md={9} lg={9} className="slack-body">
                    <ChatPanel chats={messages} />
                    <ChatFooterPanel message={messages} onSend={sendMessage} />
                </Col>
            </Row>
        </Container>
    );
}

function TeamsAndContacts({ teamsJoined, channelJoined, contacts, onContactChange, onTeamChange, onChannelChange }) {

    return (
        <>
            <div className="team-name">
                <span>Workspace</span>
                <div className="list">
                    {_.map(channelJoined, (data, i) => {
                        return <span className="list-item" key={"channel" + i} onClick={(e) => onChannelChange(e, data)}>#&nbsp;&nbsp;{data.name}</span>
                    })}
                </div>
            </div>
            <div className="team-name">
                <span>Team Name</span>
                <div className="list">
                    {_.map(teamsJoined, (data, i) => {
                        return <span className="list-item" key={"tname" + i} onClick={(e) => onTeamChange(e, data)}>#&nbsp;&nbsp;{data.name}</span>
                    })}
                </div>
            </div>
            <div className="team-name">
                <span>Direct message</span>
                <div className="list">
                    {_.map(contacts, (data, i) => {
                        return (
                            <div key={"dm" + i} style={{ display: "block"}}>
                                <span className="status"/>
                                <span className="list-item" onClick={(e) => onContactChange(e, data)}>
                                    {data.firstName + ' ' + data.lastName}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <UserSearch />
        </>
    );
}


function ChatFooterPanel({ message, onSend }) {

    const context = useContext(UserContext);
    const inputRef = useRef(null);

    let placeholder = message.workspace ? "Workspace: " + message.workspace.name : (message.team ? "Team: " + message.team.name : (message.contact ? "To :" + message.contact.email : ""));

    useEffect(() => {
        inputRef.current.value = ""
    }, [])

    return (
        <>
            <Row className="chat-panel-footer">
                <Col sm={1}>
                    <div className="chat-icon">
                        <span>{context.user ? context.user.user.firstName.substr(0, 1).toUpperCase() + '' + context.user.user.lastName.substr(0, 1).toUpperCase() : ""}</span>
                    </div>
                </Col>
                <Col sm={11}>
                    <Row>
                        <Col sm={11}>
                            <textarea ref={inputRef} id="btn-input" type="textarea" rows="3" className="form-control input-sm" placeholder={placeholder} />
                        </Col>
                        <Col sm={1}>
                            <Button variant="outline-danger" onClick={() => { if (inputRef.current.value === "" || !message.messages) { alert("Error") } else { onSend(message, inputRef.current.value); inputRef.current.value = ""; } }}>Send</Button>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

function ChatPanel({ chats }) {
    return (
        <div className="panel-body">
            <div style={{ float: "right", fontSize: "xx-small" }}>{chats.workspace ? <span>Workspace: {chats.workspace.name}</span> : (chats.team ? <span>Team: {chats.team.name}</span> : (chats.contact ? <span>User: {chats.contact.email}</span> : null))}</div>
            {
                _.map(chats.messages, (chat, i) => {
                    return <Chat key={'chat' + i} chat={chat} />
                })
            }
        </div>
    );
}


function Chat({ chat }) {

    const context = useContext(UserContext);
    return (
        <Container className={chat.user.email === (context.user.user.email || "") ? "chat reply" : "chat"}>
            <Row>
                <Col sm={1}>
                    <div className="img-circle"><span>{chat.user.firstName.substr(0, 1).toUpperCase() + '' + chat.user.lastName.substr(0, 1).toUpperCase()}</span></div>
                </Col>
                <Col sm={10}>
                    <p><strong className="">{chat.user.firstName + ' ' + chat.user.lastName}</strong></p>
                    <p><small className="time-status"><span className="status active"></span>{timeSince(chat.createdAt)}</small></p>
                </Col>
            </Row>
            <Row style={{ padding: "2% 0", margin: "0", color: "#545454" }}>
                <p>
                    {chat.text}
                </p>

            </Row>
        </Container>
    );
}
/****************
 * 
 * 
 * 
 */
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      style={{ textDecoration: "none", color: "lightgray", fontSize: "larger"}}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState([]);

      function getUsers (event, text) {
          if(text.length < 3) {
              setValue([])
              return
          }
          fetch("http://localhost:3001/slack/user/search/" + text, {
            method: 'GET'
            })
            .then(response => response.json()/*{ if(response.status === "200") {return response.json();} else{ throw new Error(response);}}*/)
            .then(res => {
                setValue(res)
            })
            .catch(err => {
                console.log(err)
            })
      }
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type user name ..."
            onChange={(e) => getUsers(e, e.target.value)}
            //value={value}
          />
          <ul className="list-unstyled">
              {
                  value.map((user, i) => {
                      return <Dropdown.Item eventKey={i}>{user.firstName + ' ' + user.lastName}</Dropdown.Item>
                  })
              }
            {/*React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )*/}
          </ul>
        </div>
      );
    },
  );

function UserSearch() {
    return(
        <div style={{ marginTop: "10%"}}>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                Search user
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                {/*<Dropdown.Item eventKey="1">Red</Dropdown.Item>
                <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                    Orange
                </Dropdown.Item>
    <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>*/}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
/***
 * 
 * 
 * 
 */

function timeSince(date) {

    var seconds = Math.floor((new Date() - new Date(date)) / 1000);


    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}