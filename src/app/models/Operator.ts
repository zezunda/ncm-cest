import { Client } from "./Client";

export class Operator {
    constructor(
        public id: number
        , public name: string
        , public email: string
        , public password: string
        , public clientId: number
        , public client: Client
        , public type: any
        , public isEnabled: boolean
        , public lastLogIn?: Date
    ) { }
}