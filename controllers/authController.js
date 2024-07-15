const { User, validateUser } = require('../models/userModel')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const sendEmail = require('../utils/email')
const Wallet = require('../models/walletModel')

exports.signup = catchAsync(async (req, res, next) => {
    const { error } = validateUser(req.body)
    if (error) return next(new AppError(error.details[0].message, 400))

    const { fullName, emailAddress, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
        fullName,
        emailAddress,
        password: hashedPassword,
    })

    const newUserWallet = await Wallet.create()

    await newUser.setWallet(newUserWallet)

    newUser.generateEmailToken()
    const token = newUser.generateAuthToken()
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
    }).send({
        status: 'success',
        user: _.omit(newUser.toJSON(), ['password', 'emailConfirmToken']),
        token,
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { emailAddress, password } = req.body

    let user = await User.findAll({
        where: {
            emailAddress,
        },
    })

    if (user[0] === undefined) {
        return next(new AppError('Incorrect email or password', 400))
    }

    user = user[0]
    if ((await user.comparePasswords(password, user.password)) === false) {
        return next(new AppError('Incorrect email or password', 400))
    }

    const token = user.generateAuthToken()
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    }).send({
        status: 'success',
        user: _.omit(user.toJSON(), 'password'),
    })
})

exports.verifyEmail = catchAsync(async (req, res, next) => {
    const user = req.user
    const token = user.emailConfirmToken

    const confirmEmailUrl = `https://learn-kdp-git-master-xelem.vercel.app/confirm_email/${token}`

    const message = `<p>Hello ${user.username}</p>s
    <p>
    Thank you for signing up to KDP Learn! We are delighted to have you
    onboard. Please click on the link below to confirm your email address
    </p>
    </p>
    <a href="${confirmEmailUrl}" target="_blank"><button>Confirm Email</button></a>
    <p>`

    await sendEmail(res, {
        email: 'texter@mailsac.com',
        subject: 'Email Verification: Verify your email',
        message,
    })
})
