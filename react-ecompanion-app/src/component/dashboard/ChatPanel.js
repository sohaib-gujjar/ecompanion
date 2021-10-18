import { ContactMail, Group, Workspaces } from "@mui/icons-material";
import { Card } from "@mui/material";
import _ from "lodash";
import { useContext, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import timeSince from "../../services/timeSince";

export default function ChatPanel({ chats }) {

    let ref = useRef(null);

    useEffect(() => {
        ref.scrollIntoView({ behavior: "smooth" });
    }, [chats]);
    return (
        <>
            <Card>
                {chats.messages && <span style={{ margin: "10px 15px"}}>
                    {chats.workspace ? <span><Workspaces /> {chats.workspace.name}</span> : (chats.team ? <span><Group/> {chats.team.name}</span> : (chats.contact ? <span><ContactMail/> {chats.contact.email}</span> : null))}
                    <span style={{ margin: "10px 15px", fontSize: "small", color: "gray"}}>Total messages : {chats.messages.length}</span>
                </span>}
            </Card>
            <div className="panel-body">
                {
                    _.map(chats.messages, (chat, i) => {
                        return <Chat key={'chat' + i} chat={chat} />
                    })
                }
                <div ref={(el) => { ref = el; }} />
            </div>
        </>
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