import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
            <Col md={{ span: 6, offset: 3 }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Invoice Number</th>
                    <th>Item UPC</th>
                    <th>Item Name</th>
                    <th>Item Price (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{this.props.invoiceNumber}</td>
                    <td>{this.props.itemUpc}</td>
                    <td>{this.props.itemName}</td>
                    <td>{this.props.itemPrice}</td>
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
