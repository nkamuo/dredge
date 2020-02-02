import Vue, { VueConstructor } from 'vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
import { Container, interfaces } from 'inversify';

export default class Application {


    Vue: VueConstructor<Vue>;

    store: Store<any>;

    router: VueRouter;

    private plugins: any;

    private container: Container = new Container();

    modules: { [i: string]: any } = {};

    resolvingModules: { [i: string]: any} = {};



    constructor(Vue: VueConstructor<Vue>, store: Store<any>, router: VueRouter) {
        this.Vue = Vue ;
        this.store = store;
        this.router = router;
    }

    public async installModule(moduleName: string, module: (app: Application, Vue: VueConstructor<Vue>, store: Store<any>, router: VueRouter) => any) {

        var result = module(this, this.Vue, this.store, this.router);

        if (result instanceof Promise){
            this.resolvingModules[moduleName]  = result;

            var value = await result;

            this.modules[moduleName] = value;

           delete this.resolvingModules[moduleName];
        }

        else{
            this.modules[moduleName] = result;
        }
    }





    public getContainer(){
        return this.container;
    }


    public registerService(name: string, Service: new (...args: any[]) => unknown){

        var id  = Symbol.for(name);

        this.container.bind(id).to(Service)
    }

    public registerServiceFactory(name: string, factory: (...args: any) => object){

        var id = Symbol.for(name);

        this.container.bind<any>(id).toFactory( (context: interfaces.Context) =>{

            return factory;
        })
    }


    public registerSericeInstance(serviceName: string, service: object){

        var id = Symbol.for(serviceName);

        this.container.bind<any>(id).toFactory( ( context: interfaces.Context) => {

            return () => service;
        })
    }





    



    public async boot(config: { [i: string]: any}){


       
        for(var moduleName in config.modules){

            var {install} = await config.modules[moduleName];

            console.log('module: ', module)

            this.installModule(moduleName, install );
        }
    }

}