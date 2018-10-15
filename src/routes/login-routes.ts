import * as express from "express";
import { User } from "../entity/User";
import {UserAuth} from "../services/auth-services";


export default class AuthRoutes {

    async login(req : express.Request, res : express.Response){
        let user = new UserAuth()
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
        let user = new UserAuth()
        let registrationData = req.body.registrationdata
        try {
           await user.registerUser(registrationData);
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
