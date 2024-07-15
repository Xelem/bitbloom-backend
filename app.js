const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const transactionRouter = require('./routes/transactionRoutes')
const errorHandler = require('./controllers/errorController')
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v0/users', userRouter)
app.use('/api/v0/auth', authRouter)
app.use('/api/v0/transactions', transactionRouter)

app.use(errorHandler)

module.exports = app
