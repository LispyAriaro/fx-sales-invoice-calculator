import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Nav, Navbar, Form, Container, Row, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


const styles = {
}

const navbar = {
  color: '#ffffff'
}


class Home extends Component {
  state = {
    startDate: new Date()
  };

  constructor(props) {
    super(props);
    
    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin() {
    
  }

  handleDateChange = date => {
    console.log(date.getTime())

    this.setState({
      startDate: date.getTime()
    })
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand style={navbar}>Simple Fx Sales Invoice Calculator</Navbar.Brand>
        </Navbar><br/><br/>

        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Form.Group controlId="invoiceNumber">
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="itemUpc">
                  <Form.Label>Item UPC</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="itemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="itemPrice">
                  <Form.Label>Item Price</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="itemName">
                  <Form.Label>FX Rate Date</Form.Label>
                  <br/>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  // onLoginPage: PropTypes.bool.isRequired,
  // onSignupPage: PropTypes.bool.isRequired
};


// export default Home;

const mapStateToProps = state => ({
  // onLoginPage: state.access.onLoginPage,
  // onSignupPage: state.access.onSignupPage
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
