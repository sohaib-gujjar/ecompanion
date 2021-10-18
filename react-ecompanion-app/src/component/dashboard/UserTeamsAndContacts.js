import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import _ from "lodash";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getFromServer } from "../../services/api";
import UserSearch from "./UserSearch";

export default function UserTeamsAndContacts({ teamsJoined, channelJoined, contacts, onContactChange, onTeamChange, onChannelChange }) {

    const context = useContext(UserContext);
    const [directContacts, setDirectContacts] = useState(contacts)

    function onAddNewContact(userId) {

        const isUser = _.find(contacts, function(o) { return o.id === userId; })

        if(!isUser) {
            getFromServer("user/" + userId, context)
            .then(res => {
                    setDirectContacts(contacts.push(res))
                })
                .catch(err => {
                    console.log(err)
                })   
        }

    }
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
                <Typography variant="h6">Teams</Typography>
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
            <UserSearch onItemSelect={onAddNewContact}/>
        </Box>
    );
}
