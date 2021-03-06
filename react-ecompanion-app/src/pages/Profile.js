import { useCallback, useContext, useEffect, useState } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import Header from "../component/Header";
import { UserContext } from "../context/UserContext";
import _ from "lodash";
import { getFromServer, postToServer } from "../services/api";

export default function Profile() {

    const context = useContext(UserContext);
    const [workspace, setWorkspace] = useState(null);
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        if (context) {
            if (context.user) {
                loadWorkSpaces();
                loadTeams();
            }
        }
    }, [])

    function loadWorkSpaces() {
        getFromServer("workspace/user", context)
            .then(res => {
                setWorkspace(res)
            })
            .catch(err => {
                alert(JSON.stringify(err))
            })
    }

    function loadTeams() {
        let user = context.user;
        getFromServer("team/user" , context)
        .then(res => {
                setTeams(res)
            })
            .catch(err => {
                alert(JSON.stringify(err))
            })
    }
    const load = useCallback(() => {
        loadWorkSpaces();
        loadTeams();
    }, []);


    if (context.user) return (
        <Header active>
            <div style={{ margin: "8% 0" }}>
                <Workspace workspace={workspace} load={load}/>
                <Teams teams={teams} load={load}/>
            </div>
        </Header>
    )
    else return (<div>error</div>)
}

function Workspace({ workspace, load }) {

    const context = useContext(UserContext);

    function joinWS(event, data) {
        let user = context.user;
        postToServer("workspace/join/"+ data.id+ "/"+ user.id, {}, context)
            .then(res => {
                load()
            })
            .catch(err => console.error(err))
    }
    function removeWS(event, data) {
        let user = context.user;
        postToServer("workspace/remove/"+ data.id+ "/"+ user.id, {}, context)
            .then(res => {
                load()
            })
            .catch(err => console.error(err))
    }
    return(
        <Container style={{ boxShadow: "1px 2px 10px rgba(0, 0, 0, 0.25)"}}>
                    <Row>
                        <h1 style={{ margin: "3%"}}>Workspace</h1>
                    </Row>
                    {
                        workspace && <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Join</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _.map(workspace, (data, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{data.name}</td>
                                            <td>
                                                {
                                                    data.users.length == 0 ?
                                                        <Button variant="primary" value={i} onClick={e => joinWS(e, data)}>Join</Button>
                                                        :
                                                        <Button variant="danger" value={i} onClick={e => removeWS(e, data)}>Remove</Button>
                                                }
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                </Container>
    )
}

function Teams({ teams, load }) {

    const context = useContext(UserContext);

    function joinTeam(event, data) {
        let user = context.user;
        postToServer("team/join/"+ data.id+ "/"+ user.id, {}, context)
            .then(res => {
                load()
            })
            .catch(err => {
                alert(JSON.stringify( err))
            })
    }
    function removeTeam(event, data) {
        let user = context.user;
        postToServer("team/remove/"+ data.id+ "/"+ user.id, {}, context)
            .then(res => {
                load()
            })
            .catch(err => {
                alert(JSON.stringify( err))
            })
    }

    return (
        <Container style={{ boxShadow: "1px 2px 10px rgba(0, 0, 0, 0.25)", marginTop: "5%" }}>
            <Row>
                <h1 style={{ margin: "3%"}}>Teams</h1>
            </Row>
            {
                teams && <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Workspace</th>
                            <th>Join</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(teams, (data, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.workspace.name}</td>
                                    <td>
                                        {
                                            data.users.length === 0 ?
                                                <Button variant="primary" value={i} onClick={e => joinTeam(e, data)}>Join</Button>
                                                :
                                                <Button variant="danger" value={i} onClick={e => removeTeam(e, data)}>Remove</Button>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            }
        </Container>
    )
}