import { Client } from "./Client";

export class Product {
    constructor(
        public id: number
        , public name: string
        , public code: string
        , public barCode: string
        , public groupCd: string
        , public ncm: string
        , public pis: string
        , public cofins: string
        , public cst: string
        , public cest: string
        , public isEnabled: boolean
        , public isSelected: boolean
    ) { }
}
