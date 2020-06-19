import express, { Router, Request, Response } from 'express'
import { calculateInvoice } from './api/controllers/CalculatorController'

const router: Router = express.Router()
router.post('/api/v1/calculator/invoice', calculateInvoice)

const serveSpa = (req: Request, res: Response) => {
  res.render('index.html')
}
router.get('/', serveSpa)
router.get('/*', serveSpa)

export default router
