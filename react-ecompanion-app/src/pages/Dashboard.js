import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Header from "../component/Header";
import '../styles/dashboard.scss';
import _ from 'lodash';
import { UserContext } from '../context/UserContext';
import '../styles/emoji.scss';

export default function Dashboard() {

    const [user, setUser] = useState(null);

    const context = useContext(UserContext);


    const [contacts, setContacts] = useState([{ name: "Lorem ipsum", id: 1 }, { name: "Ipsum Lorem", id: 2 }]);
    let [teamsJoined, setTeamsJoined] = useState([{ name: "Team 1", id: 1 }, { name: "Team2", id: 2 }]);
    let [workspace, setWorkspace] = useState([{ name: "Channel 1", id: 1 }, { name: "Channel 2", id: 2 }]);

    const [messages, setMessages] = useState([]);

    /*************************************************         */
    function getWorkspaces(user) {
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
    }
    function getUserTeams(user) {
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
    function getUserDirectChats(user) {
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
            console.log("getToken", context)
            if (context.user) {
                setUser(user);

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
        getWorkspaces("test@test.com")
        getUserTeams("test@test.com")
        getUserDirectChats("test@test.com")

    }, []);

    function onContactChange(e, d) {
        const current_user = context.user.id;
        fetch("http://localhost:3001/slack/" + current_user + "/" + d.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => {
                setMessages(res)
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
                setMessages(res)
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
                setMessages(res)
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }

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
                    <ChatFooterPanel />
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
                <div >
                    {_.map(channelJoined, (data, i) => {
                        return <span key={"channel" + i} onClick={(e) => onChannelChange(e, data)}>{data.name}</span>
                    })}
                </div>
            </div>
            <div className="team-name">
                <span>Team Name</span>
                <div >
                    {_.map(teamsJoined, (data, i) => {
                        return <span key={"tname" + i} onClick={(e) => onTeamChange(e, data)}>{data.name}</span>
                    })}
                </div>
            </div>
            <div className="team-name">
                <span>Direct message</span>
                <div >
                    {_.map(contacts, (data, i) => {
                        return <span key={"dm" + i} onClick={(e) => onContactChange(e, data)}>{data.firstName + ' ' + data.lastName}</span>
                    })}
                </div>
            </div>


            {/*<div>
            
            <div class="emoji emoji--like">
                <div class="emoji__hand">
                    <div class="emoji__thumb">
                    </div>
                </div>
            </div>
            
            <div class="emoji emoji--love">
                <div class="emoji__heart">
                </div>
            </div>
            
            <div class="emoji emoji--wow">
                <div class="emoji__face">
                    <div
                        class="emoji__eyebrows">
                    </div>
                    <div class="emoji__eyes">
                    </div>
                    <div class="emoji__mouth">
                    </div>
                </div>
            </div>
                </div>*/}
        </>
    );
}


function ChatFooterPanel() {
    return (
        <>
            <Row className="chat-panel-footer">
                <Col sm={1}>
                    <span className="chat-icon">
                        <svg version="1.1" viewBox="0 0 100 100">
                            <g>
                                <path d="m83.898 77.398c-2.3984-13-13.699-22.5-26.898-22.5h-13.699c-13.5 0-24.898 9.8008-27.102 23.102-1.1016 6.6992 4.1016 12.699 10.801 12.699h46.199c6.8008 0 12-6.1992 10.801-12.898z"></path>
                                <path d="m36.102 44.199c7.8008 7.8008 20.398 8 28.398 0.39844l0.19922-0.19922c6.8984-6.6016 7.6016-17.301 1.5-24.699-8.3008-10-23.699-9.8008-31.699 0.39844-5.6016 7.1992-5 17.5 1.5 24z"></path>
                            </g>
                        </svg>
                    </span>
                </Col>
                <Col sm={11}>
                    <Row>
                        <Col sm={10}>
                            <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." />
                        </Col>
                        <Col sm={2}>
                            <Button variant="outline-danger">Send</Button>

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
            {
                _.map(chats, (chat, i) => {
                    return <Chat chat={chat} />
                })
            }
        </div>
    );
}


function Chat({ chat }) {

    const context = useContext(UserContext);
    return (
        <Container className={chat.user.email == (context.user.user.email || "") ? "chat reply" : "chat"}>
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