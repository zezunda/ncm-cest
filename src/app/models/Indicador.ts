export class Indicador {
    constructor(
        public id: number
        , public cest: string
        , public ncm: string
        , public groupCd: string
        , public description: string
        , public pis: string
        , public cofins: string
        , public cst: string
        , public annex: string
        , public isEnabled: boolean
    ) { }
}
