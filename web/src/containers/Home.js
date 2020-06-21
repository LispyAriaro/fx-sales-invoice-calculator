import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  showLoadingModal,
  performInvoiceCalculation,
  showValidationError
} from '../actions'

import { Nav, Navbar, Form, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


const styles = {
}

const navbar = {
  color: '#ffffff'
}


class Home extends Component {
  constructor(props) {
    super(props);

    this.error = ''

    this.invoiceNumber = this.props.invoiceNumber || ''
    this.itemUpc = this.props.itemUpc || ''
    this.itemName = this.props.itemName || ''
    this.itemUsdPrice = this.props.itemUsdPrice || 0.0
    this.fxRateJsDate = this.props.fxRateJsDate || moment().subtract(30, 'days').toDate()

    // this.invoiceNumber = '',
    // this.itemUpc = '',
    // this.itemName = '',
    // this.itemUsdPrice = '',
    // this.fxRateJsDate = moment().subtract(30, 'days').toDate(),

    this.generateInvoice = this.generateInvoice.bind(this);
  }

  generateInvoice(event) {
    if(!this.invoiceNumber) {
      this.error = 'Invoice Number is needed'
    } else if(!this.itemUpc) {
      this.error = 'Item UPC is needed'
    } else if(!this.itemName) {
      this.error = 'Item Name is needed'
    } else if(!this.itemUsdPrice) {
      this.error = 'Item Price is needed'
    } else if(this.fxRateJsDate) {
      this.error = ''
      const lowerDateLimit = moment().add(-90, 'days').startOf('day')
      const selectedDateMoment = moment(this.fxRateJsDate)

      if(!selectedDateMoment.isBetween(lowerDateLimit, moment(), '[]')) {
        this.error = `Selected date is invalid. It should be between: ${lowerDateLimit.format('YYYY-MM-DD')} and ${moment().format('YYYY-MM-DD')}`
      } else {
        this.error = ''
        this.props.performInvoiceCalculation(this.invoiceNumber, this.itemUpc, 
          this.itemName, this.itemUsdPrice, this.fxRateJsDate, this.props.history)
        return  
      }
    }

    this.props.showValidationError(this.error)
  }

  handleInvoiceNumberChange = (fieldValue) => {
    this.invoiceNumber = fieldValue.target.value
  }
  handleItemUpcChange = (fieldValue) => {
    this.itemUpc = fieldValue.target.value
  }
  handleItemNameChange = (fieldValue) => {
    this.itemName = fieldValue.target.value
  }
  handleItemPriceChange = (fieldValue) => {
    this.itemUsdPrice = parseFloat(fieldValue.target.value)
  }

  handleDateChange = date => {
    this.fxRateJsDate = date
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand style={navbar}>Simple Fx Sales Invoice Calculator</Navbar.Brand>
        </Navbar><br/><br/>

        <Container>
          {this.error.length > 0 &&
            <Row>
              <Col>
              <Alert variant='danger'>{this.error}</Alert>
              </Col>
            </Row>
          }
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Form.Group controlId="invoiceNumber">
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control type="text" placeholder="" defaultValue={this.invoiceNumber} onChange={this.handleInvoiceNumberChange} required />
                </Form.Group>

                <Form.Group controlId="itemUpc">
                  <Form.Label>Item UPC</Form.Label>
                  <Form.Control type="text" placeholder="" defaultValue={this.itemUpc} onChange={this.handleItemUpcChange} required />
                </Form.Group>

                <Form.Group controlId="itemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control type="text" placeholder="" defaultValue={this.itemName} onChange={this.handleItemNameChange} required />
                </Form.Group>

                <Form.Group controlId="itemPrice">
                  <Form.Label>Item Price</Form.Label>
                  <Form.Control type="number" placeholder="" defaultValue={this.itemUsdPrice} onChange={this.handleItemPriceChange} required />
                </Form.Group>

                <Form.Group controlId="itemName">
                  <Form.Label>FX Rate Date</Form.Label>
                  <br/>
                  <DatePicker
                    selected={this.fxRateJsDate}
                    onChange={this.handleDateChange}
                  />
                </Form.Group>

                <Button variant="primary" onClick={this.generateInvoice} disabled={this.props.showLoading}>
                  Generate Invoice
                </Button>

                <Form.Group controlId="itemName">
                  {this.props.showLoading &&
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading ...</span>
                      <br/><br/>
                    </Spinner>
                  }
                </Form.Group>
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
  ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  showLoadingModal,
  performInvoiceCalculation,
  showValidationError
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
