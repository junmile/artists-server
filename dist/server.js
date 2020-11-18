"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var ormConfig_1 = __importDefault(require("./ormConfig"));
dotenv_1.default.config();
var port = process.env.PORT || 4000;
var app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default({ origin: 'http://localhost:3000' }));
app.use(helmet_1.default({
    expectCt: {
        enforce: true,
        maxAge: 86400,
    },
    referrerPolicy: { policy: 'no-referrer' },
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send("<h2>\uC2DC\uC791</h2>");
});
app.use(function (err, req, res, next) {
    console.log('ExpressError : ', err);
});
typeorm_1.createConnection(ormConfig_1.default)
    .then(function () {
    console.log('db연결됨');
    app.listen(port, function () { return console.log("\uD3EC\uD2B8\uBC88\uD638 " + port + "\uB85C \uC11C\uBC84\uC2DC\uC791\uB428"); });
})
    .catch(function (err) {
    console.log('db연결에러');
    console.log('Error : ', err);
});
