import { Operator } from "./Operator";
import { Observable } from "rxjs/Observable";

export class Client {
    constructor(
        public id: number
        , public name: string
        , public cnpj: string
        , public operators: Operator[]
        , public isEnabled: boolean
    ) { }
}
