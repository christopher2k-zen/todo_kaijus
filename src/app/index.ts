
import { RouteDef, Routes } from 'route'

import view from './view'
import accueil from './accueil'
import todos from './todos'
import notFound from './routeNotFound'


export default RouteDef<Routes>('', {
  enter: router => (route, child) => view({ child, router, route }),

  children: {
    accueil: accueil(),
    todos: todos(),
    notFound: notFound
  }
})