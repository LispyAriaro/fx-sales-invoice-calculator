import 'mocha'

import * as chai from 'chai'
// let chai = require("chai")
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
let expect = chai.expect

import app from '../app'

before(function() {
  process.on('unhandledRejection', (err: any, p) => {
    console.error('unhandledRejection', err.stack, p)
  })
})



describe('CAD Invoice calculator test suite', function() {
  const payload = {
    usdAmount: 5,
    date: '2020-05-21'
  }

  it(`Valid USD amount and date for CAD conversion should succeed`, async function(done) {
    const cadInvoiceRes = await chai.request(app)
      .post('/api/v1/calculator/invoice')
      .send(payload)
    expect(cadInvoiceRes.body).to.be.a('object')
    expect(cadInvoiceRes.body.status).to.be.true
    expect(cadInvoiceRes.body.data.invoiceInCad).to.be.equal(6.973675)
    
    done()
  })

  it(`Valid USD amount and date older than 90 days should fail`, async function(done) {
    const payload = {
      usdAmount: 5,
      date: '2020-01-21'
    }
  
    try {
      await chai.request(app)
        .post('/api/v1/calculator/invoice')
        .send(payload)
    } catch(error) {
      console.log(`error.response.body`, error.response.body)

      expect(error.response.body).to.be.a('object')
      expect(error.response.body.status).to.be.false
      expect(error.response.body.data).to.not.exist
      expect(error.response.body.message).to.equal('Sorry, could not get foreign exchange rate. Please try again later')
    }

    done()
  })
})
