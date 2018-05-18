import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import feathersSocketIOClient from "@feathersjs/socketio-client";
import feathersAuthClient from "@feathersjs/authentication-client";
const feathersRx = require("feathers-reactive");

/**
 * Simple wrapper for feathers
 */
@Injectable()
export class Feathers {
    private _feathers = feathers();                     // init socket.io
    private _socket = io("http://localhost:80");      // init feathers

    constructor() {
        this._feathers
            .configure(feathersSocketIOClient(this._socket, { timeout: 60000 }))  // add socket.io plugin
            .configure(feathersAuthClient({                   // add authentication plugin
                storage: window.localStorage
            }))
            .configure(feathersRx({                           // add feathers-reactive plugin
                idField: "id"
            }));
        // this.login("zezunda@gmail.com", "250892");
    }

    login(email: string, password: string) {
        this._feathers.authenticate({
            strategy: "local",
            email,
            password
        })
            .then(() => {
                console.log("logged in");
            })
            .catch(err => {
                console.log("couldn't log in");
                console.log(err);
            });
    }

    // expose services
    public service(name: string) {
        return this._feathers.service(name);
    }

    // expose authentication
    public authenticate(credentials?): Promise<any> {
        return this._feathers.authenticate(credentials);
    }

    // expose logout
    public logout() {
        return this._feathers.logout();
    }

}
