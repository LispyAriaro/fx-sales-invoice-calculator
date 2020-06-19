import dotenv from 'dotenv'
import app from './app'

if(process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

let port: number = parseInt(process.env.PORT) || 3000

app.listen(port, () => {
  process.stdout.write(`Fx Sales Invoice Calculator Server is running on port ${port}\n`)
  process.stdout.write('-------------------------------------------\n')
})
