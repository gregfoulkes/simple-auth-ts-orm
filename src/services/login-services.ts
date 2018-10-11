import { Connection, SelectQueryBuilder, getConnection } from "typeorm";

 import * as bcrypt from 'bcrypt-nodejs';

import { User } from "../entity/User";

import { Login,Register } from "../interfaces/auth-interfaces";

let connection: Connection

export class UserAuthentication {

    async login(loginDetails:Login) {


        let foundUser = await User.findOne({ username: loginDetails.username });

        if([foundUser].length == 0 || foundUser == undefined){
            let checkPassword = bcrypt.compareSync(loginDetails.password, foundUser.password)
            console.log(checkPassword)
            if(!checkPassword){
                return 'Password is incorrect. Please enter a valid password'
            }
            return 'Please Register with Us'
        }
        return foundUser
    }

    

    async logout() {

    }

    async registerUser(registrationDetails:Register) {

        const user = new User();

        let hashPassword =  bcrypt.hashSync(registrationDetails.password)
        console.log(hashPassword)
        user.username = registrationDetails.username;
        user.fullname = registrationDetails.fullname;
        user.email = registrationDetails.email;
        user.password = hashPassword
        return await user.save();

    }

    async encryptPassword() {

    }

    async decryptPassword() {

    }
}