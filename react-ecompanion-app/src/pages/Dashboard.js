import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import '../styles/dashboard.scss';
import _ from 'lodash';
import { UserContext } from '../context/UserContext';

import { Grid } from "@mui/material";
import { getFromServer, postToServer } from "../services/api";
import DashboardHeader from "../component/dashboard/DashboardHeader";
import ChatPanel from "../component/dashboard/ChatPanel";
import ChatMessagePanel from "../component/dashboard/ChatMessagePanel";
import UserTeamsAndContacts from "../component/dashboard/UserTeamsAndContacts";

export default function Dashboard() {

    const context = useContext(UserContext);


    const [contacts, setContacts] = useState([]);
    let [teamsJoined, setTeamsJoined] = useState([]);
    let [workspace, setWorkspace] = useState([]);

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
            <DashboardHeader />

            <Grid container className="slack-window" style={{ height: "calc(100vh - 71px)", marginTop: 0, marginBottom: 0 }}>
                <Grid item xs={4} md={3} lg={2} className="slack-user-window" style={{ overflow: "auto", height: "100%" }}>
                    <UserTeamsAndContacts
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
                    <ChatMessagePanel message={messages} onSend={sendMessage} />
                </Grid>
            </Grid>
        </>
    );
}
