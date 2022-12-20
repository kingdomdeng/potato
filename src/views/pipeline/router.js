export default [
  {
    path: 'pipeline',
    name: 'pipeline',
    component: () => import(/* webpackChunkName: "notice" */'./index.vue'),
  }
]
