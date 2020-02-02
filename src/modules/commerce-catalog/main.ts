import Application from '@/lib/applicattion';
import Vue, { VueConstructor } from 'vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
import routes from './routes';
import ProductList from './components/product.list.vue';


export const install = function(app: Application, Vue: VueConstructor<Vue>, store: Store<any>, router: VueRouter){
    

        Vue.component('catalog-product-list', ProductList)
        
    router.addRoutes(routes);
    
    
}