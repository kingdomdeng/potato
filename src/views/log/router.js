export default [
  {
    path: 'log',
    name: 'log',
    component: () => import(/* webpackChunkName: "log" */'./index.vue'),
  }
]
