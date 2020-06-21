import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Nav, Navbar, Form, Container, Row, Col, Button, Table } from 'react-bootstrap'


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

        <Container>
          <Row>
            <Col md={{ offset: 2 }}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Invoice #: </Form.Label>
                <Form.Label>{this.props.invoiceNumber}</Form.Label>
              </Form.Group>
              
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Date: </Form.Label>
                <Form.Label>{moment(this.props.fxRateJsDate).format('YYYY-MM-DD')}</Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Item UPC</th>
                    <th>Item Unit Price (CAD)</th>
                    <th>Item Amount (CAD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{this.props.itemName}</td>
                    <td>{this.props.itemUpc}</td>
                    <td>{this.props.invoiceInCad}</td>
                    <td>{this.props.invoiceInCad}</td>
                  </tr>
                </tbody>
              </Table>
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
  ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invoice))
