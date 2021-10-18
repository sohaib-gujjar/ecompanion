import React, { useContext, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { getFromServer } from "../../services/api";

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
        const context = useContext(UserContext)

        function getUsers(event, text) {
            if (text.length < 3) {
                setValue([])
                return
            }
            getFromServer("slack/user/search/" + text, context)
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

export default function UserSearch({ onItemSelect }) {
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