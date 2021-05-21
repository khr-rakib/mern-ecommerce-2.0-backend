const admin = require('../firebase')

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