const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')
const url = 'mongodb+srv://Roshan:Roshan786@cluster0.eoiy197.mongodb.net/test?retryWrites=true&w=majority';


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://jwt-authentication-nodejs-frontend.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true

}))
app.use(cookieParser())


// mongoose.connect('mongodb+srv://Roshan:Roshan786@cluster0.eoiy197.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin") {
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get('/dashboard', verifyUser, (req, res) => {
    res.json("Success")
})

app.post('/register', (req, res) => {
    const {name, email, password} =  req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({email: user.email, role: user.role}, 
                        "jwt-secret-key", {expiresIn:"1d"}) 
                        res.cookie('token', token )
                        return res.json({Status: "Success", role: user.role})
                } else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})

app.listen(3001, () => {
    console.log("Server is Running")
})


















// const express = require("express")
// const mongoose = require('mongoose')
// const cors = require("cors")
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
// const UserModel = require('./models/User')

// const app = express()
// app.use(express.json())
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     credentials: true

// }))
// app.use(cookieParser())


// mongoose.connect('mongodb+srv://Roshan:Roshan786@cluster0.eoiy197.mongodb.net/?retryWrites=true&w=majority')

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token) {
//         return res.json("Token is missing")
//     } else {
//         jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//             if(err){
//                 return res.json("Error with token")
//             } else {
//                 if(decoded.role === "admin") {
//                     next()
//                 } else {
//                     return res.json("not admin")
//                 }
//             }
//         })
//     }
// }

// app.get('/dashboard', verifyUser, (req, res) => {
//     res.json("Success")
// })

// app.post('/register', (req, res) => {
//     const {name, email, password} =  req.body;
//     bcrypt.hash(password, 10)
//     .then(hash => {
//         UserModel.create({name, email, password: hash})
//         .then(user => res.json("Success"))
//         .catch(err => res.json(err))
//     }).catch(err => res.json(err))
// })

// app.post('/login', (req, res) => {
//     const {email, password} = req.body;
//     UserModel.findOne({email: email})
//     .then(user => {
//         if(user) {
//             bcrypt.compare(password, user.password, (err, response) => {
//                 if(response) {
//                     const token = jwt.sign({email: user.email, role: user.role}, 
//                         "jwt-secret-key", {expiresIn:"1d"}) 
//                         res.cookie('token', token )
//                         return res.json({Status: "Success", role: user.role})
//                 } else {
//                     return res.json("The password is incorrect")
//                 }
//             })
//         } else {
//             return res.json("No record existed")
//         }
//     })
// })

// app.listen(3001, () => {
//     console.log("Server is Running")
// })








