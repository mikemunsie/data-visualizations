import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/index';
import ForceGraph from '@/pages/forcegraph';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/forcegraph',
      name: 'ForceGraph',
      component: ForceGraph
    }
  ]
})
