import { Injectable } from "@angular/core";
import { Feathers } from "./feathers.service";

@Injectable()
export class DataService {

    public clients; operators; products; permissions; cest;
    public searcher = {
        getOptions: undefined,
        getItem: undefined,
        getItemUrl: undefined
    };
    public groups = {
        find: undefined,
        findNoMap: undefined
    };

    private nodes = {
        clients: "clients",
        operators: "operators",
        products: "products",
        permissions: "permission",
        searcher: "searcher",
        cest: "cest"
    };

    constructor(private feathers: Feathers) {
        this.clients = this.methods.call(this, this.nodes.clients);
        this.operators = this.methods.call(this, this.nodes.operators);
        this.products = this.methods.call(this, this.nodes.products);
        this.permissions = this.methods.call(this, this.nodes.permissions);
        this.cest = this.methods.call(this, this.nodes.cest);
        // SEARCHER ISN'T REST
        this.searcher.getOptions = (term) => this.getOptions.call(this, this.nodes.searcher, term);
        this.searcher.getItem = (term) => this.getItem.call(this, this.nodes.searcher, term);
        this.searcher.getItemUrl = (term) => this.getItemUrl.call(this, this.nodes.searcher, term);
        // GROUPS HAVEN'T ALL METHODS
        this.groups.find = (query?) => this.find.call(this, this.nodes.products, query);
        this.groups.findNoMap = (query?) => this.findNoMap.call(this, this.nodes.products, query);
    }

    private methods = (node: string) => {
        return {
            find: (query?) => this.find.call(this, node, query),
            findNoMap: (query?) => this.findNoMap.call(this, node, query),
            create: (data) => this.create.call(this, node, data),
            update: (id, data) => this.update.call(this, node, id, data),
            patch: (id, data) => this.patch.call(this, node, id, data),
            remove: (id) => this.remove.call(this, node, id)
        };
    }

    private find(node: string, query?) {
        return (<any>this.feathers
            .service(node))
            .watch({ listStrategy: "smart" })
            .find(query)
            .map(r => r.data);
    }

    private findNoMap(node: string, query?) {
        return (<any>this.feathers
            .service(node))
            .watch({ listStrategy: "always" })
            .find(query);
    }

    private create(node: string, data: any) {
        return this.feathers
            .service(node)
            .create(data)
            .catch(this.errorHandler);
    }

    private update(node: string, id: string, data: any) {
        return this.feathers
            .service(node)
            .update(id, data)
            .catch(this.errorHandler);
    }

    private patch(node: string, id: string, data: any) {
        return this.feathers
            .service(node)
            .patch(id, data)
            .catch(this.errorHandler);
    }

    private remove(node: string, id: string) {
        return this.feathers
            .service(node)
            .remove(id)
            .catch(this.errorHandler);
    }

    private getOptions(node: string, term: string) {
        const data = this.getData("list", term);
        return this.feathers
            .service(node)
            .create(data)
            .catch(this.errorHandler);
    }

    private getItem(node: string, term: string) {
        const data = this.getData("item", term);
        return this.feathers
            .service(node)
            .create(data)
            .catch(this.errorHandler);
    }

    private getItemUrl(node: string, term: string) {
        const data = this.getData("url", term);
        return this.feathers
            .service(node)
            .create(data);
    }

    private getData(type: string, term: string) {
        return {
            search: type,
            term: term
        };
    }

    private errorHandler(err) {
        console.log("data.service: ", err);
    }
}
