import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Header from "../component/Header";
import '../styles/home.scss';

export default function Home() {
  return (

    <Header>
      <div className="main-page">
        <div className="title">
          <div className="icon">
            <i className="fa fa-comments"></i>
          </div>
          <div className="title-separator"></div>
          <h1> Simple Chat Platform</h1>
          <h2>Connect with friends and colleagues</h2>
        </div>


        <section id="about">
          <Container>
            <Row>
              <h1>About</h1>
              <div className="hline"></div>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            </Row>
            <Row>
              <Col sm={6}>
                <h2>Process</h2>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </Col>
              <Col sm={6}>
                <h2>Approach</h2>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <h2>Goal</h2>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </Col>
              <Col sm={6}>
                <h2>Mission</h2>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </Col>
            </Row>
          </Container>
        </section>



        <section id="team">
          <Container>
            <Row>
              <h1>Meet the Team</h1>
              <div className="hline"></div>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            </Row>
            <Row style={{ textAlign: "center" }}>
              <Col sm={3}>
                <img src="user.png" alt=""/>
                <h4>Team Member</h4>
                <p>Software Engineer</p>
                <a href="#" className="fa fa-linkedin"/>
                <a href="#" className="fa fa-instagram"/>
                <a href="#" className="fa fa-facebook"/>
                <a href="#" className="fa fa-twitter"/>
              </Col>
              <Col sm={3}>
                <img src="user.png" alt=""/>
                <h4>Team Member</h4>
                <p>Backend Developer</p>
                <a href="#" className="fa fa-linkedin"/>
                <a href="#" className="fa fa-instagram"/>
                <a href="#" className="fa fa-facebook"/>
                <a href="#" className="fa fa-twitter"/>
              </Col>
              <Col sm={3}> <img src="user.png" alt=""/>
                <h4>Team Member</h4>
                <p>Frontend Developer</p>
                <a href="#" className="fa fa-linkedin"/>
                <a href="#" className="fa fa-instagram"/>
                <a href="#" className="fa fa-facebook"/>
                <a href="#" className="fa fa-twitter"/>
              </Col>
              <Col sm={3}> <img src="user.png" alt=""/>
                <h4>Team Member</h4>
                <p>Designer</p>
                <a href="#" className="fa fa-linkedin"/>
                <a href="#" className="fa fa-instagram"/>
                <a href="#" className="fa fa-facebook"/>
                <a href="#" className="fa fa-twitter"/>
              </Col>
            </Row>
          </Container>
        </section>



        <section id="skills">
          <Container>
            <h1>Services</h1>
            <div className="hline"></div>
            <Row>
              <Col sm={4}>
                <h3>Api Development</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, recusandae, at, labore velit eligendi amet nobis repellat natus.</p>
              </Col>
              <Col sm={4}>
                <h3>Cloud</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, recusandae, at, labore velit eligendi amet nobis repellat natus.</p>
              </Col>
              <Col sm={4}>
                <h3>DevOps</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, recusandae, at, labore velit eligendi amet nobis repellat natus.</p>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <div className="progressBar">
                  <h6>Amazon web services</h6>
                  <div className="progressBarContainer">
                    <div className="progressBarValue value-90"></div>
                  </div>
                </div>
                <div className="progressBar">
                  <h6>Backend</h6>
                  <div className="progressBarContainer">
                    <div className="progressBarValue value-80"></div>
                  </div>
                </div>
                <div className="progressBar">
                  <h6>Data base</h6>
                  <div className="progressBarContainer">
                    <div className="progressBarValue value-30"></div>
                  </div>
                </div>
                <div className="progressBar">
                  <h6>NoSQL</h6>
                  <div className="progressBarContainer">
                    <div className="progressBarValue value-70"></div>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <p>Lorem ipsum dolor sit amet, enim soluta consectetur adipisicing elit. Sit, eius, itaque, porro, beatae impedit officia tenetur reiciendis in quia eum autem. Enim soluta consectetur adipisicing elit.</p>
              </Col>
            </Row>
          </Container>
        </section>







        <section id="portfolio">
          <Container>
            <h1>Portfolio</h1>
            <div className="hline"></div>
            <Row>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work One" /></Col>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work Two" /></Col>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work Three" /></Col>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work Four" /></Col>
            </Row>
            <Row style={{ marginTop: "3%" }}>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work Five" /></Col>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work Six" /></Col>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work Seven" /></Col>
              <Col sm={3}> <img src="underconstruction.png" className="image" alt="Work Eight" /></Col>
            </Row>
          </Container>
        </section>





        <section id="testimonial">
          <div className="container">
            <div className="quoteLoop">
              <blockquote className="quote"> <img src="underconstruction.png" width="100" height="100" alt="" />
                <h5>&nbsp;<br />
                  &rdquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;<br />
                  <small>Steve Bruce, Sed ut perspiciatis unde omnis</small>
                </h5>
              </blockquote>
              <blockquote className="quote"> <img src="underconstruction.png" width="100" height="100" alt="" />
                <h5>&nbsp;<br />
                  &ldquo;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.&rdquo;<br />
                  <small>Tom Jones, Sed ut perspiciatis unde omnis</small></h5>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="contact">
          <Container>
            <h1>Contact</h1>
            <div className="hline"></div>
            <Form>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ width: "100%"}}>
                Submit
              </Button>
            </Form>
          </Container>
        </section>


        <footer>
          <Container>
            <Row>
              <Col sm={6}>
                <p>All right reserved. &#169;2021</p>
              </Col>
              <Col sm={6} style={{ textAlign: "end"}}>
                <a href="#" className="fa fa-facebook"/>
                <a href="#" className="fa fa-twitter"/>
                <a href="#" className="fa fa-linkedin"/>
                <a href="#" className="fa fa-youtube"/>
                <a href="#" className="fa fa-instagram"/>
              </Col>
            </Row>
          </Container>
        </footer>

      </div>
    </Header>
  );
}