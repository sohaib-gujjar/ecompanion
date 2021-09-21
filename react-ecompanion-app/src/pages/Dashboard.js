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


    useEffect(() => {
        if (context) {
            console.log("getToken", context)
            if (context.user) {
                setUser(user);
            }
        }
        if (!user) {
            //window.location.href = "/signin";
        }
    });

    function onContactChange(e, d) {
        console.log(e, d);
    }
    function onTeamChange(e, d) {
        console.log(e, d);
    }
    function onChannelChange(e, d) {
        console.log(e, d);
    }
    let contacts = [{ name: "Lorem ipsum", id: 1 }, { name: "Ipsum Lorem", id: 2 }];
    let teamsJoined = [{ name: "Team 1", id: 1 }, { name: "Team2", id: 2 }];
    let channelJoined = [{ name: "Channel 1", id: 1 }, { name: "Channel 2", id: 2 }];

    return (
        <Container className="slack-window" >
            <Row>
                <Header />
            </Row>
            <Row style={{ height: "90vh", marginTop: 0, marginBottom: 0 }}>
                <Col sm={3} md={3} lg={3} className="slack-user-window">
                    <TeamsAndContacts
                        contacts={contacts}
                        channelJoined={channelJoined}
                        teamsJoined={teamsJoined}
                        onTeamChange={onTeamChange}
                        onChannelChange={onChannelChange}
                        onContactChange={onContactChange}
                    />
                </Col>
                <Col sm={9} md={9} lg={9} className="slack-body">
                    <ChatPanel />
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
                <span>Team Name</span>
                <div >
                    {_.map(teamsJoined, (data, i) => {
                        return <span key={"tname" + i} onClick={(e) => onTeamChange(e, data)}>{data.name}</span>
                    })}
                </div>
            </div>
            <div className="team-name">
                <span>Channels</span>
                <div >
                    {_.map(channelJoined, (data, i) => {
                        return <span key={"channel" + i} onClick={(e) => onChannelChange(e, data)}>{data.name}</span>
                    })}
                </div>
            </div>
            <div className="team-name">
                <span>Direct message</span>
                <div >
                    {_.map(contacts, (data, i) => {
                        return <span key={"dm" + i} onClick={(e) => onContactChange(e, data)}>{data.name}</span>
                    })}
                </div>
            </div>


        <div>
            
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
                </div>
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

function ChatPanel() {
    return (
        <div className="panel-body">
            <Chat></Chat>
            <ChatReply />
            <Chat></Chat>
            <ChatReply />
            <Chat></Chat>
            <ChatReply />
        </div>
    );
}


function Chat() {
    return (
        <Container className="chat">
            <Row>
                <Col sm={1}>
                    <div className="img-circle"><span>BP</span></div>
                </Col>
                <Col sm={10}>
                    <p><strong className="">Lorem ipsum</strong></p>
                    <p><small className="time-status"><span className="status active"></span>15 mins ago</small></p>
                </Col>
            </Row>
            <Row style={{ padding: "2% 0", margin: "0", color: "#545454" }}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                    dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                    dolor, quis ullamcorper ligula sodales.
                </p>

            </Row>
        </Container>
    );
}


function ChatReply() {
    return (
        <Container className="chat reply">
            <Row>
                <Col sm={1}>
                    <div className="img-circle"><span>ME</span></div>
                </Col>
                <Col sm={10}>
                    <p><strong className="">Lorem ipsum</strong></p>
                    <p><small className="time-status"><span className="status active"></span>15 mins ago</small></p>
                </Col>
            </Row>
            <Row style={{ padding: "2% 0", margin: "0", color: "#545454" }}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                    dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                    dolor, quis ullamcorper ligula sodales.
                </p>

            </Row>
        </Container>
    );
}