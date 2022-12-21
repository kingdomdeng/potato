export default [
  {
    path: 'user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */'./index.vue'),
    meta: {
      keepAlive: false,
      // exclude: ['User'],
    }
  }
]
