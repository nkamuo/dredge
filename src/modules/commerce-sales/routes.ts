export default [
    { path: '/sales/orders', component: () => import('./components/order.layout.vue'),
      children: [
          { path: '', component: () => import('./components/order.index.vue'), name: 'sales.order.index'},
          { path: 'create', component: () => import('./components/order.create.vue')}
      ]},

];