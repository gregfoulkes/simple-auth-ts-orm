import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from "express";
import * as bodyParser from  "body-parser";
import  AuthRoutes  from "./routes/login-routes";

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

///routes here

let auth = new AuthRoutes()

app.get('api/')

app.get('api/waiter:username', auth.login )

app.post('api/register', auth.register)

async function start () {
    try {
        await createConnection();
        app.listen(7010)
    }
    catch(err) {
        console.log(err);
    }
}

start()

module.exports = app


