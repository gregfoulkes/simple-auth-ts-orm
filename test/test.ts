import * as assert from "assert";
import { createConnection, Connection } from "typeorm";
import { User } from "../src/entity/User";
import { UserAuthentication } from "../src/services/login-services";

import "reflect-metadata";

describe('Waiter-Webbapp-Function', function () {

let userAuth = new UserAuthentication
let connection: Connection;

  before(async function () {

    try {
      let connectionUrl = process.env.DB || "postgresql://coder:1234@localhost:5432/user_auth"
      connection = await createConnection({
        "name": "default",
        "type": "postgres",
        "url": connectionUrl,
        "synchronize": true,
        "logging": false,

        "entities": [
          "src/entity/**/*.ts"
        ],
        "migrations": [
          "src/migration/**/*.ts"
        ],
        "subscribers": [
          "src/subscriber/**/*.ts"
        ],
        "cli": {
          "entitiesDir": "src/entity",
          "migrationsDir": "src/migration",
          "subscribersDir": "src/subscriber"
        }
      });

    }
    catch (err) {
      console.log(err);
    }


  });

  beforeEach(async function () {

    let user = await User.find({})

    await User.remove(user)
  })

 

  it('should check the user is registered', async function(){
    let user = new User
    let oneUser = {
      username:'gregfoulkes',
      fullname:'Greg Foulkes',
      email:'greg_foulkes@live.com',
      password:'1234'
    }
    await userAuth.registerUser(oneUser)
    let checkThisUser = await userAuth.login({username:'gregfoulkes', password:'1234'})
    //console.log(checkThisUser.password)

    let foundUser = await User.findOne({ username: checkThisUser.username });
    assert.equal(checkThisUser.username,'gregfoulkes')
    assert.equal(checkThisUser.password,foundUser.password)

  })

    it('should return please register with us', async function(){
    let user = new User

    let oneUser = {
      username:'gregfoulkes',
      fullname:'Greg Foulkes',
      email:'greg_foulkes@live.com',
      password:'1234'
    }
    await userAuth.registerUser(oneUser)
    let checkThisUser = await userAuth.login({username:'gregfoulkes', password:'1234'})

    console.log(checkThisUser)
    assert.equal(checkThisUser, 'Please Register with Us')
  })

  it('should return please enter a valid password', async function(){
    let user = new User
    let oneUSer = {
      username:'gregfoulkes',
      fullname:'Greg Foulkes',
      email:'greg_foulkes@live.com',
      password:'1234'
    }
    await userAuth.registerUser(oneUSer)
    let checkThisUser = await userAuth.login({username:'gregfoulkes', password:'123'})
    //console.log(checkThisUser)
    //let check = ();
    let foundUser = await User.findOne({ username: checkThisUser.username });

    assert.equal(checkThisUser.username,'gregfoulkes')
    assert.equal(checkThisUser,'Password is incorrect. Please enter a valid password')

  })

  after(async function () {
    connection.close();
  })

})