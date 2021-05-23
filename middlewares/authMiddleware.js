const admin = require('../firebase')
const User = require('../models/userModel')

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Invalid or expire token')
    }
}

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user
    try {
        const adminUser = await User.findOne({ email }).exec()
        if (adminUser.role !== 'admin') {
            res.status(403).json({
                err: 'Admin resource. Access denied'
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}