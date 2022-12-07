export default [
  {
    path: 'notice',
    name: 'notice',
    component: () => import(/* webpackChunkName: "notice" */'./index.vue'),
  }
]
