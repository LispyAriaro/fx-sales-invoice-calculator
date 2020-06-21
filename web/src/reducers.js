import { 
  SHOW_LOADING_MODAL, 
  INVOICE_CALCULATION_SUCCESS,
  INVOICE_CALCULATION_FAIL,
  VALIDATION_ERROR
} from './actionTypes'

const initialState = {
  validationError: '',
  showLoading: false,
  invoiceNumber: '',
  itemUpc: '',
  itemName: '',
  itemUsdPrice: 0.00,
  fxRateJsDate: new Date(),
  invoiceInCad: '',

  invoiceCalculationDone: null,
  invoiceCalculationFailed: null,
}

function rootReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOADING_MODAL:
      return {...state, showLoading: true}
    case VALIDATION_ERROR:
      return {...state, validationError: action.validationError}
    case INVOICE_CALCULATION_SUCCESS:
      return {
        ...state, 
        showLoading: false, 

        invoiceNumber: action.payload.invoiceNumber,
        itemUpc: action.payload.itemUpc,
        itemName: action.payload.itemName,
        itemUsdPrice: action.payload.itemUsdPrice,
        fxRateJsDate: action.payload.fxRateJsDate,
        invoiceInCad: action.payload.invoiceInCad,
    
        invoiceCalculationDone: true,
        invoiceCalculationFailed: false
      }
    case INVOICE_CALCULATION_FAIL:
      return {
        ...state,
        invoiceCalculationFailed: true
      }
    default:
      return state;
  }
}

export default rootReducer
