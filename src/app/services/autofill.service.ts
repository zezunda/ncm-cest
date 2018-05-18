import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Observable } from "rxjs/Observable";
import { Product } from "../models/Product";
import { ProductQuery } from "./ProductQuery";

@Injectable()
export class AutoFill {

    private items$: Observable<Product[]>;

    constructor(private data: DataService, private query: ProductQuery) { }

    public init() {
        this.items$ = this.data.products.findNoMap(this.query.query);
        this.items$.subscribe(resp => {
            console.log(resp);
            this.Loop(resp["data"] as Product[], this.query);
        });
    }

    private Loop(list: any[], query: ProductQuery) {
        list = list.filter(prod => prod.barCode.length >= 8);
        console.log(list);
        let count = 0;
        list.forEach(async prod => {
            const ncmCest = await this.data.searcher.getItem(prod.barCode);
            if (ncmCest) {
                if (ncmCest["ncm"]) {
                    prod.ncm = ncmCest["ncm"];
                    console.log("found NCM on Cosmos for", prod.name, " ", count);
                }
                if (ncmCest["cest"]) {
                    prod.cest = ncmCest["cest"];
                    console.log("found CEST on Cosmos for", prod.name, " ", count);
                }
            } else {
                console.log("not found: ", prod.name, " ", count);
            }
            const ncm = prod.ncm.replace(".", "").replace(".", "");
            const term = `%${ncm.slice(0, 4)}.${ncm.slice(4, 6)}.${ncm.slice(6)}%`;
            if (prod.cest.length === 0) {
                const cests$ = await this.data.cest.find({ query: { ncm: { $like: term } } });
                cests$.subscribe(cests => {
                    if (cests.length === 1) {
                        prod.cest = cests[0].cest;
                        console.log("found CEST in DB for", prod.name);
                    }
                });
            }
        });
    }
}
