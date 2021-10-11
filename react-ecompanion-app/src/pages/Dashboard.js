import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Dropdown, FormControl } from "react-bootstrap";
import '../styles/dashboard.scss';
import _ from 'lodash';
import { UserContext } from '../context/UserContext';
import '../styles/emoji.scss';
import { DescriptionEditor } from "../component/formikComponents";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Grid, AppBar, Avatar, Box, Divider, IconButton, List, ListItem, Toolbar, Typography, CircularProgress, Button } from "@mui/material";
import { Menu, Search, Send as SendIcon } from "@mui/icons-material";
import AccountMenu from "../component/dashboard/AccountMenu";
import { getFromServer, postToServer } from "../services/api";
import { NavLink } from "react-router-dom";

export default function Dashboard() {

    const context = useContext(UserContext);


    const [contacts, setContacts] = useState([{ name: "Lorem ipsum", id: 1 }, { name: "Ipsum Lorem", id: 2 }]);
    let [teamsJoined, setTeamsJoined] = useState([{ name: "Team 1", id: 1 }, { name: "Team2", id: 2 }]);
    let [workspace, setWorkspace] = useState([{ name: "Channel 1", id: 1 }, { name: "Channel 2", id: 2 }]);

    const [messages, setMessages] = useState({});

    /*************************************************         */
    const getWorkspaces = useCallback(async (user) => {
        getFromServer("slack/getUserWorkspace/" + user, context)
            .then(res => {
                setWorkspace(res)
            })
            .catch(err => console.log(err))
    }, [])

    const getUserTeams = (user) => {
        getFromServer("slack/getUserTeams/" + user, context)
            .then(res => {
                setTeamsJoined(res)
            })
            .catch(err => console.log(err))
    }
    const getUserDirectChats = (user) => {
        getFromServer("slack/getUserDirectChats/" + user, context)
            .then(res => {
                setContacts(res)
            })
            .catch(err => console.log(err))
    }
    /**************************************************          */


    useEffect(() => {
        if (context) {
            if (context.user) {
                const current_user = context.user.email;

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
        const current_user = context.user.id;
        getFromServer("slack/getDM/" + current_user + "/" + d.id, context)
            .then(res => {
                setMessages({ contact: d, messages: res })
            })
            .catch(err => console.log(err))
    }
    function onTeamChange(e, d) {

        getFromServer("slack/getTeamsChat/" + d.id, context)
            .then(res => {
                setMessages({ team: d, messages: res })
            })
            .catch(err => console.log(err))
    }
    function onChannelChange(e, d) {
        getFromServer("slack/getWorkspaceChat/" + d.id, context)
            .then(res => {
                setMessages({ workspace: d, messages: res })
            })
            .catch(err => console.log(err))
    }

    /*************************************************         */

    const sendMessage = useCallback(async (message, text, cb) => {
        if (message.contact) {
            const body = {
                text: text,
                sender: context.user,
                receiver: message.contact
            }
            postToServer("slack/userMessage", body, context)
                .then(res => {
                    onContactChange(null, body.receiver)
                })
                .catch(err => console.log(err))
        }
        else if (message.team) {
            const body = {
                text: text,
                user: context.user,
                teams: message.team
            }
            postToServer("slack/teamsMessage", body, context)
                .then(res => {
                    onTeamChange(null, body.teams)
                })
                .catch(err => console.log(err))
        }
        else if (message.workspace) {
            const body = {
                text: text,
                user: context.user,
                workspace: message.workspace
            }
            postToServer("slack/workspaceMessage", body, context)
                .then(res => {
                    onChannelChange(null, body.workspace)
                })
                .catch(err => console.log(err))
        }
    })

    /**************************************************          */

    return (
        <>
            <MaterialHeader />

            <Grid container className="slack-window" style={{ height: "calc(100vh - 70px)", marginTop: 0, marginBottom: 0 }}>
                <Grid item xs={4} md={3} lg={2} className="slack-user-window" style={{ overflow: "auto", height: "100%" }}>
                    <TeamsAndContacts
                        contacts={contacts}
                        channelJoined={workspace}
                        teamsJoined={teamsJoined}
                        onTeamChange={onTeamChange}
                        onChannelChange={onChannelChange}
                        onContactChange={onContactChange}
                    />
                </Grid>
                <Grid item xs={8} md={9} lg={10} className="slack-body">

                    <ChatPanel chats={messages} />
                    <ChatFooterPanel message={messages} onSend={sendMessage} />
                </Grid>
            </Grid>
        </>
    );
}

function TeamsAndContacts({ teamsJoined, channelJoined, contacts, onContactChange, onTeamChange, onChannelChange }) {

    return (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <Typography variant="h6">Workspace</Typography>
                {_.map(channelJoined, (data, i) => {
                    return (
                        <ListItem button key={"channel" + i} onClick={(e) => onChannelChange(e, data)}>
                            <span className="list-item" >#&nbsp;&nbsp;{data.name}</span>
                        </ListItem>
                        )
                })}
            </List>
            <Divider style={{ background: 'white' }} variant="middle" />
            <List>
                <Typography variant="h6">Team Name</Typography>
                {_.map(teamsJoined, (data, i) => {
                    return (<ListItem button key={"tname" + i} onClick={(e) => onTeamChange(e, data)}><span className="list-item">#&nbsp;&nbsp;{data.name}</span></ListItem>)
                })}
            </List>
            <Divider style={{ background: 'white' }} variant="middle" />
            <List>
                <Typography variant="h6">Direct message</Typography>
                {_.map(contacts, (data, i) => {
                    return (
                        <ListItem button key={"dm" + i} onClick={(e) => onContactChange(e, data)}>
                            <span className={i % 2 === 0 ? "status" : "status active"} />
                            <span className="list-item">
                                {data.firstName + ' ' + data.lastName}
                            </span>
                        </ListItem>
                    )
                })}
            </List>
            <Divider style={{ background: 'white' }} variant="middle" />
            <UserSearch />
        </Box>
    );
}


function ChatFooterPanel({ message, onSend }) {

    const context = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    let placeholder = message.workspace ? "Workspace: " + message.workspace.name : (message.team ? "Team: " + message.team.name : (message.contact ? "To :" + message.contact.email : ""));

    useEffect(() => {
        setEditorState(() =>
            EditorState.createEmpty(),
        )
        setLoading(false);
    }, [message, loading])

    return (
        <>
            <Row className="chat-panel-footer">
                <Col sm={1}>
                    <div className="chat-icon" style={{ paddingTop: "0" }}>
                        {
                            context.user && (
                                context.user.img ?
                                    <img className="chat-icon" style={{ paddingTop: "0" }} src={`http://localhost:3001/${context.user.img.path}`} />
                                    :
                                    <span>{context.user.firstName.substr(0, 1).toUpperCase() + '' + context.user.lastName.substr(0, 1).toUpperCase()}</span>
                            )}
                    </div>
                </Col>
                <Col sm={11}>
                    <Row>
                        <Col sm={11}>
                            {/*<textarea ref={inputRef} id="btn-input" type="textarea" rows="3" className="form-control input-sm" placeholder={placeholder} />*/}
                            <DescriptionEditor
                                editorState={editorState}
                                placeholder={placeholder}
                                onChange={(v, val) => setEditorState(val)} />
                        </Col>
                        <Col sm={1}>
                            {/*<Button variant="outline-danger" onClick={() => { if (inputRef.current.value === "" || !message.messages) { alert("Error") } else { onSend(message, inputRef.current.value); inputRef.current.value = ""; } }}>Send</Button>*/}
                            {/*<Button variant="outline-danger" onClick={() => {
                                    onSend(message, convertToHTML(editorState.getCurrentContent()));
                                    setEditorState(() => EditorState.createEmpty(), ) }} >Send</Button>*/}
                            <Button
                                onClick={() => {
                                    if (message.contact || message.team || message.workspace) {


                                        onSend(message, convertToHTML(editorState.getCurrentContent()));
                                        setLoading(true);
                                    }
                                    else {
                                        alert("Select domain")
                                    }
                                }}
                                endIcon={<SendIcon />}
                                disabled={loading}
                                variant="contained"
                            >
                                {loading && <CircularProgress size={14} />}
                                {!loading && 'Send'}
                            </Button>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

function ChatPanel({ chats }) {

    let ref = useRef(null);

    useEffect(() => {
        ref.scrollIntoView({ behavior: "smooth" });
    }, []);
    return (
        <div className="panel-body">
            <div ref={(el) => { ref = el; }} style={{ float: "right", fontSize: "xx-small" }}>{chats.workspace ? <span>Workspace: {chats.workspace.name}</span> : (chats.team ? <span>Team: {chats.team.name}</span> : (chats.contact ? <span>User: {chats.contact.email}</span> : null))}</div>
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
        <Container className={chat.user.email === (context.user.email || "") ? "chat reply" : "chat"}>
            <Row>
                <Col sm={1}>
                    {
                        chat.user.img ?
                            <img className="img-circle" style={{ paddingTop: "0" }} src={`http://localhost:3001/${chat.user.img.path}`} />
                            :
                            <div className="img-circle"><span>{chat.user.firstName.substr(0, 1).toUpperCase() + '' + chat.user.lastName.substr(0, 1).toUpperCase()}</span></div>
                    }
                </Col>
                <Col sm={11}>
                    <Row>
                        <span>
                            <strong className="">{chat.user.firstName + ' ' + chat.user.lastName}</strong>
                            <small className="time-status"><span className="status active"></span>{timeSince(chat.createdAt)}</small>
                        </span>
                    </Row>
                    <Row style={{ color: "#545454" }}>
                        <div dangerouslySetInnerHTML={{ __html: chat.text }} />
                    </Row>
                </Col>
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
        style={{ textDecoration: "none", color: "lightgray", fontSize: "larger" }}
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

        function getUsers(event, text) {
            if (text.length < 3) {
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
                            return <Dropdown.Item key={i} eventKey={user.id}>{user.firstName + ' ' + user.lastName}</Dropdown.Item>
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

    function onItemSelect(event) {
        console.log(event)
    }
    return (
        <div style={{ marginTop: "10%" }}>
            <Dropdown onSelect={e => onItemSelect(e)}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    Search user
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
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




function MaterialHeader() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "darkblue"}}>
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


function MaterialBody() {
    return (
        <Box sx={{ flexGrow: 1 }}>

        </Box>
    )
}

function MaterialSidePanel() {
    return (
        <Box sx={{ flexGrow: 1 }}>

        </Box>
    )
}

function MaterialChatPanel() {
    return (
        <Box sx={{ flexGrow: 1 }}>

        </Box>
    )
}