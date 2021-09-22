import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { UserInfo } from "./UserInfo";


export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scroll_active: this.props.active
    }
  }

  componentDidMount() {
    if (!this.props.active)
      window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (!this.props.active)
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.scrollY > 10) {
      this.setState({
        scroll_active: true
      });
    }
    else {
      this.setState({
        scroll_active: false
      });
    }
  }

  render() {
    return (
      <>
        <header className={this.state.scroll_active ? "App-header header-active" : "App-header"}>
          <Container>
            <Row>
              <Col sm={4} md={4} lg={4} className="icon">
                <Link to="/">
                  <img src="favicon.ico" alt=""></img>
                  <span className="app-title">E Companion</span>
                </Link>
              </Col>
              <Col sm={8} md={8} lg={8} style={{ alignSelf: "center"}}>
                <nav className="App-header-nav">
                    <ul>
                      <li>
                        <Link  className="navItem" to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link className="navItem" to="/signup">Sign Up</Link>
                      </li>
                      <li>
                        <Link className="navItem" to="/signin">Sign In</Link>
                      </li>
                      <li>
                        <UserInfo />
                      </li>
                    </ul>
                  </nav>
              </Col>
            </Row>
          </Container>
        </header>
        {this.props.children && <div className={this.state.scroll_active ? "App-body body-active" : "App-body"}>
          {this.props.children}
        </div>}
      </>
    );
  }
}