export default  [
    { path: '/inventory/stock',  component: () => import('./components/stock.layout.vue'),
      children: [
        { path: '',  component: () => import('./components/stock.index.vue'), },
      ]
    },

    {
      path: '/inventory/stores', component: () => import('./components/store.layout.vue'),
      children: [
        { path: '', component: () => import('./components/store.index.vue') },
        { path: 'create', component: () => import('./components/store.create.vue' )}
      ]
    }
]