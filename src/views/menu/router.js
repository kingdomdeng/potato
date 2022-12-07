export default [
  {
    path: 'menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "menu" */'./index.vue'),
  }
]
