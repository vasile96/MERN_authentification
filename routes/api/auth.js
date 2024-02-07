const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')


router.get('/', auth, async (req, res) => {
    try {
        const user = await (User.findById(req.user.id)).select('-password')
        res.json(user)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

router.post('/', 
[
    check('email', 'Valid email adress required').isEmail(),
    check('password', 'Password required').exists()
],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] })
        }

        //compare returns a promise so 'await'
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 7200000 },
            (err, token) => {
                if (err) throw err
                res.json({ token })
            })
        


    }catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router;