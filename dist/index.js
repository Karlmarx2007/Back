"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var product_router_1 = require("./routers/product-router");
var user_router_1 = require("./routers/user-router");
dotenv_1.default.config();
var app = express_1.default();
var dbUser = process.env.MONGO_DB_USER;
var dbPassword = process.env.MONGO_DB_PASSWORD;
var database = process.env.MONGO_DB_DATABASE;
var connString = "mongodb+srv://" + dbUser + ":" + dbPassword + "@cluster0-mwra4.azure.mongodb.net/" + database + "?retryWrites=true&w=majority";
mongoose_1.default.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(function (error) { return console.log(error); });
app.use(body_parser_1.default.json());
app.use('/api/products', product_router_1.productRouter);
app.use('/api/users', user_router_1.userRouter);
var port = process.env.PORT || 9080;
app.listen(port, function () {
    console.log('started at http://localhost:', port);
});
