import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Nav, Navbar, Form, Container, Row, Col, Button } from 'react-bootstrap'


const styles = {
}

const navbar = {
  color: '#ffffff'
}


class Invoice extends Component {
  constructor(props) {
    super(props);
    
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand style={navbar}>Simple Fx Sales Invoice Calculator</Navbar.Brand>
        </Navbar><br/><br/>

        invoice page

        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Invoice.propTypes = {
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invoice))
