const User = require('../models/userModel')

exports.createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user
    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true })
    
    if (user) {
        res.json(user)
    } else {
        const newUser = await new User({ email, name, picture })
        newUser.save()
        res.json(newUser)
    }    
}

exports.currentUser = async (req, res) => {
    await User.findOne({ email: req.user.email })
        .exec((err, user) => {
            if (err) throw new Error(err)
            res.json(user)
        })
}