const express = require('express')
const Usermodel = require("../db/models/user")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("api")
})

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
                        res.status(200).send(userdata)
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
                    res.status(200).send(user)
                }
            }
        }
    })


})

router.get("/user", (req, res) => {
    let users = [
        {
            "name": "nishidh",
            "age": 22
        },
        {
            "name": "nishidh",
            "age": 22
        },
        {
            "name": "nishidh",
            "age": 22
        },
        {
            "name": "nishidh",
            "age": 22
        },
        {
            "name": "nishidh",
            "age": 22
        }
    ]
    // res.json(users)
    res.status(200).json(users)
})


module.exports = router