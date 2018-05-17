import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/index';
import BarChart from '@/pages/barchart';
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
      path: '/barchart',
      name: 'BarChart',
      component: BarChart
    },
    {
      path: '/forcegraph',
      name: 'ForceGraph',
      component: ForceGraph
    }
  ]
})
