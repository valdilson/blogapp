// CARREGANDO MODULOS
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()    
const admin = require('./routs/admin')
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

// Configurações
     // Config Session   
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))
        // Config do Flash (Deve ser sempre abaixo da sessão) 
            app.use(flash())
    //Middleware - para trabalhar com as sessões    
        app.use((req,res,next)=>{
            //Variavel Global
            res.locals.success_msg = req.flash("success_msg"),
            res.locals.error_msg = req.flash("error_msg")
            next()
        })

    // BodyParser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //HandleBars
    app.engine("handlebars", handlebars({defaultLayout:"main"}))
    app.set("view engine","handlebars")
    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/blogapp",{useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
            console.log("Conectado ao mongo")
        }).catch((err)=>{
            console.log("Erro ao se conectar" + err)
        })

    // Public confg
    app.use(express.static(path.join(__dirname,"public")))
        
            //Teste de Midleware
            // app.use((req,res,next)=>{
            //     console.log("Oi eu sou um Midleware")
            //     next()
            // })

//Rotas
    app.use('/admin', admin)


//Outros

const PORT = 8081
app.listen(PORT,()=>{
    console.log("Servidor Rodando")
})