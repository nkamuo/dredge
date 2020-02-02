import Application from '@/lib/applicattion';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import routes from './routes'

export const install = function(app: Application, view: Vue, store: Store<any>, router: VueRouter){


    router.addRoutes(routes);

}