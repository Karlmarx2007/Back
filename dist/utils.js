"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("./config"));
var getToken = function (user) {
    var secret = config_1.default.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user.toJSON(), secret, {
        expiresIn: '48h'
    });
};
exports.getToken = getToken;
var isAuth = function (req, res, next) {
    var token = req.headers.authorization;
    console.log('req.headers > ', req.headers);
    if (token) {
        //Getting rid of "Bearer"
        var onlyToken = token.slice(6, token.length);
        jsonwebtoken_1.default.verify(onlyToken, config_1.default.JWT_SECRET, function (err, decode) {
            if (err) {
                return res.status(401).send({ msg: 'invalid token', err: err });
            }
            req.user = decode;
            next();
            return;
        });
    }
    else {
        return res.status(401).send({ msg: 'token is not supplied' });
    }
};
exports.isAuth = isAuth;
var isAdmin = function (req, res, next) {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'Admin token is not valid' });
};
exports.isAdmin = isAdmin;
