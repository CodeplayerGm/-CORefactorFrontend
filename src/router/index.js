import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import NlpProcess from '@/components/NlpProcess'
import TopicModeling from '@/components/TopicModeling'
import FunctionalTopic from '@/components/FunctionalTopic'
import DependencyExtract from '@/components/DependencyExtract'
import FunctionalAtom from '@/components/FunctionalAtom'
import GeneticSearch from '@/components/GeneticSearch'
import ProgramChart from '@/components/ProgramChart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/NlpProcess',
      name: 'NlpProcess',
      component: NlpProcess
    },
    {
      path: '/TopicModeling',
      name: 'TopicModeling',
      component: TopicModeling
    },
    {
      path: '/FunctionalTopic',
      name: 'FunctionalTopic',
      component: FunctionalTopic
    },
    {
      path: '/DependencyExtract',
      name: 'DependencyExtract',
      component: DependencyExtract
    },
    {
      path: '/FunctionalAtom',
      name: 'FunctionalAtom',
      component: FunctionalAtom
    },
    {
      path: '/GeneticSearch',
      name: 'GeneticSearch',
      component: GeneticSearch
    },
    {
      path: '/ProgramChart',
      name: 'ProgramChart',
      component: ProgramChart
    }

  ]
})
