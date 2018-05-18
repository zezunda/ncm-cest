export class IndicadorQuery {

    constructor() { }

    private _pageSize = 10;

    public get pageSize(): number {
        return this._pageSize;
    }

    public set pageSize(v: number) {
        this._pageSize = v;
    }

    private _page = 1;

    public get page(): number {
        return this._page;
    }

    public set page(v: number) {
        this._page = v + 1;
    }

    private _sortProperty = "";

    public get sortProperty(): string {
        return this._sortProperty;
    }

    public set sortProperty(v: string) {
        this._sortProperty = v;
    }

    private _sortDireaction = "asc";

    public get sortDirection(): string {
        return this._sortDireaction;
    }

    public set sortDirection(v: string) {
        this._sortDireaction = v;
    }

    private _term = "";

    public get term(): string {
        return `%${this._term}%`;
    }

    public set term(v: string) {
        this._term = v;
    }

    private get _direction(): number {
        return (this.sortDirection === "desc") ? -1 : 1;
    }

    private get _sort(): object {
        const obj = {};
        obj[this.sortProperty] = this._direction;
        return obj;
    }

    private get _skip(): number {
        return (this.pageSize * this.page) - this.pageSize;
    }

    private get _or(): Array<object> {
        return [
            { cest: { $like: this.term } },
            { ncm: { $like: this.term } },
            { groupCd: { $like: this.term } },
            { description: { $like: this.term } },
            { pis: { $like: this.term } },
            { cofins: { $like: this.term } },
            { cst: { $like: this.term } },
            { annex: { $like: this.term } }
        ];
    }

    public get query(): object {
        return {
            query: {
                $skip: this._skip,
                $limit: this.pageSize,
                $sort: this._sort,
                $or: this._or
            }
        };
    }
}
