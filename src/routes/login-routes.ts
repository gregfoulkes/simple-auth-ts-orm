import * as express from "express";
import { User } from "../entity/User";
import {UserAuthentication} from "../services/login-services";


export default class LoginRoutes {

    async login(req : express.Request, res : express.Response){
        let user = new UserAuthentication()
        let loginData = req.body.userdata
        try {
            const days = await user.login(loginData);
            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async register(req : express.Request, res : express.Response){
        let user = new UserAuthentication()
        let registrationData = req.body.registrationdata
        try {
            const days = await user.registerUser(registrationData);
            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }
}
