
const bcrypt = require('bcrypt-nodejs');

module.exports = function() {

    function hashPassword(password) {
        // let hashPassword =  bcrypt.hashSync(password)
        // console.log('hash ==== ' + hashPassword)
        // return hashPassword

        return new Promise(function(resolve, reject) {
            bcrypt.hash(password, 5, function(err, result) {
                if (err) {
                    return reject(err)
                }
                resolve(result);
            })
        });

    }

    async function comparePassword(password) {
        let hashPassword = await this.hashPassword(password)
        // console.log(hashPassword);
        // return new Promise(function(resolve, reject){
        //     return bcrypt.compare(password, hashPassword, function(err, result) {
        //         // res == false
        //         if (err) {
        //             return reject(err);
        //         }
        //         return resolve(result)
        //     });
        // });
    }
    

    return{
        hashPassword,
        comparePassword
    }

}