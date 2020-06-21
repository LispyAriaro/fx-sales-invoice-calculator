import moment from 'moment'
import axios from 'axios'

// import createHistory from 'history/createBrowserHistory'
// export const history = createHistory()


import { 
  SHOW_LOADING_MODAL, 
  INVOICE_CALCULATION_SUCCESS,
  INVOICE_CALCULATION_FAIL
} from './actionTypes'


let apiBaseUrl = '';

if(process.env.NODE_ENV === 'production') {
  apiBaseUrl = 'https://fx-sales-invoice-calculator.herokuapp.com'
} else {
  apiBaseUrl = 'http://localhost:3000'
}

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
};

export function performInvoiceCalculation(invoiceNumber, itemUpc, itemName, itemUsdPrice, fxRateJsDate, history) {
  console.log('itemUsdPrice: ', itemUsdPrice)

  const postData = {
    usdAmount: parseFloat(itemUsdPrice),
    date: moment(fxRateJsDate).format('YYYY-MM-DD')
  }

  return dispatch => {
    dispatch({
      type: SHOW_LOADING_MODAL
    })

    axios.post(`${apiBaseUrl}/api/v1/calculator/invoice`, postData, axiosConfig)
      .then((res) => {
        const serverResponse = res.data;
        console.log("serverResponse: ", serverResponse);

        if (serverResponse && serverResponse.status) {
          const invoiceInCad = serverResponse.data.invoiceInCad
          dispatch({
            type: INVOICE_CALCULATION_SUCCESS,
            payload: {
              invoiceNumber: invoiceNumber,
              itemUpc: itemUpc,
              itemName: itemName,
              itemUsdPrice: itemUsdPrice,
              fxRateJsDate: fxRateJsDate,
              invoiceInCad
            }
          })
          history.push('/invoice')
        } else {
          dispatch({
            type: INVOICE_CALCULATION_FAIL
          })
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err)
        dispatch({
          type: INVOICE_CALCULATION_FAIL
        })
      })
  }
}
