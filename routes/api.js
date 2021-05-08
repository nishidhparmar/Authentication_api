const express = require('express')
const jwt = require('jsonwebtoken')
const Usermodel = require("../db/models/user")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("api")
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,"serectkey")
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.post("/register", (req, res) => {
    let Userdata = req.body

    Usermodel.findOne({ email: Userdata.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (user) {
                res.status(401).send("Email Already Taken")
            } else {
                const User = new Usermodel(Userdata);
                User.save((error, userdata) => {
                    if (error) {
                        console.log(error);
                    } else {
                        let payload = { subject : userdata._id}
                        let token = jwt.sign(payload,"serectkey")
                        res.status(200).send({token})
                    }
                })
            }
        }
    })
})
router.post("/login", (req, res) => {
    let Userdata = req.body

    Usermodel.findOne({ email: Userdata.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send("Invalid email")
            } else {
                if (user.password !== Userdata.password) {
                    res.status(401).send("Invalid password")
                } else {
                    let payload = { subject : user._id}
                    let token = jwt.sign(payload,"serectkey")
                    res.status(200).send({token})
                    
                }
            }
        }
    })


})

router.get("/events", (req, res) => {
    let users = [
        {
            "name": "events"
        },
        {
            "name": "events"
        },
        {
            "name": "events"
        },
        {
            "name": "events"
        },
        {
            "name": "events"
        }
    ]
    // res.json(users)
    res.status(200).json(users)
})
router.get("/special",verifyToken, (req, res) => {
    let users = [
        {
            "name": "special"
        },
        {
            "name": "special"
        },
        {
            "name": "special"
        },
        {
            "name": "special"
        },
        {
            "name": "special"
        }
    ]
    // res.json(users)
    res.status(200).json(users)
})


module.exports = router