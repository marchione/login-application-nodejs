// import das bibliotecas utilizadas
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash'); // ???????????

var morgan       = require('morgan'); // log middleware
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//banco de dados
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // inicializa conexao com banco de dados, alterar para conectar no request

//autenticação - configura a biblioteca passport executando a função declarada em /config/passport.js
require('./config/passport')(passport); 

// configuração da aplicação
app.use(morgan('dev')); // loga requests no console - dev
app.use(cookieParser()); // leitor de cookies
app.use(bodyParser()); // recupera dados dos forms html

app.set('view engine', 'ejs'); // utilizado para os views temporariamente, futuramente todos os requests responderão json

// configuraçao da biblioteca passport
app.use(session({ secret: 'minhachavesecreta' })); // trocar secret futuramente - grava session na sessão 
app.use(passport.initialize());
app.use(passport.session()); // ???????
app.use(flash()); // ??????? use connect-flash for flash messages stored in session

// rotas - carrega rota no app com passport
require('./app/routes.js')(app, passport);

// inicializa server
app.listen(port);
console.log('Servidor nodeJS inicializado na porta: ' + port);