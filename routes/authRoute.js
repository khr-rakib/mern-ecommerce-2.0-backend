const router = require('express').Router()
const { createOrUpdateUser } = require('../controllers/authController');


router.get('/create-or-update-user', createOrUpdateUser)

module.exports = router;