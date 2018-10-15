import * as assert from "assert";
import { createConnection, Connection } from "typeorm";
import { User } from "../src/entity/User";
import { UserAuth } from "../src/services/auth-services";

import "reflect-metadata";

let Hash = require('../src/services/hash.js')

describe('Waiter-Webbapp-Function', function () {

let userAuth = new UserAuth
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


  it('should return true for the valid password entered', async function(){
    let user = new User
    let oneUSer = {
      username:'gregfoulkes',
      fullname:'Greg Foulkes',
      email:'greg_foulkes@live.com',
      password:'1234'
    }
    await userAuth.registerUser(oneUSer)
    let checkThisUser = await userAuth.login({username:'gregfoulkes', password:'1234'})
    console.log(checkThisUser)

    assert.equal(checkThisUser.username,'gregfoulkes')
    assert.equal(true,checkThisUser.match.found)

  })

  it('should return false for the invalid password entered', async function(){
    let user = new User
    let oneUSer = {
      username:'gregfoulkes',
      fullname:'Greg Foulkes',
      email:'greg_foulkes@live.com',
      password:'1234'
    }
    await userAuth.registerUser(oneUSer)
    let checkThisUser = await userAuth.login({username:'gregfoulkes', password:'123'})

    assert.equal(checkThisUser.username,'gregfoulkes')
    assert.equal(false,checkThisUser.match.found)

  })

  after(async function () {
    connection.close();
  })

})