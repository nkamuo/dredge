export default [
//Products
        {
            path: '/catalog/products', component : () => import('./components/product.layout.vue'),
            children: [
                { path: '', component: () => import('./components/product.index.vue') },
                { path: 'create', component: () => import('./components/product.create.vue') }
            ]
        },
//Brands
        {
            path: '/catalog/brands', component: () => import('./components/brand.layout.vue'),
            children: [
                { path: '', component: () => import('./components/brand.index.vue')},
                { path: 'create', component: () => import('./components/brand.create.vue')}
            ]
        },
//Categories
        {
            path: '/catalog/categories', component: () => import('./components/category.layout.vue'),
            children: [
                { path: '', component: () => import('./components/category.index.vue')},
                { path: 'create', component: () => import('./components/category.create.vue')}
            ]
        }
    ];