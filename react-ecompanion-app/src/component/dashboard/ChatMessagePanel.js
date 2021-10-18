import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { DescriptionEditor } from "../formikComponents";
import { Box, CircularProgress, Button, Grid } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

export default function ChatMessagePanel({ message, onSend }) {

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
            <Grid className="chat-panel-footer" container spacing={2}>
                {/* <Col sm={1}>
                    <div className="chat-icon" style={{ paddingTop: "0" }}>
                        {
                            context.user && (
                                context.user.img ?
                                    <img className="chat-icon" style={{ paddingTop: "0" }} src={`http://localhost:3001/${context.user.img.path}`} />
                                    :
                                    <span>{context.user.firstName.substr(0, 1).toUpperCase() + '' + context.user.lastName.substr(0, 1).toUpperCase()}</span>
                            )}
                    </div>
                </Col>*/}
                <Grid item sm={8} md={10}>
                    {/*<textarea ref={inputRef} id="btn-input" type="textarea" rows="3" className="form-control input-sm" placeholder={placeholder} />*/}
                    <DescriptionEditor
                        editorState={editorState}
                        placeholder={placeholder}
                        onChange={(v, val) => setEditorState(val)} />
                </Grid>
                <Grid item sm={4} md={2}>
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
                        variant="outlined"
                    >
                        {loading && <CircularProgress size={14} />}
                        {!loading && 'Send'}
                    </Button>

                </Grid>
            </Grid>
        </>
    );
}