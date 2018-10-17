import page1 from './page1'
import page2 from './page2'
import notFound from './routeNotFound'
import { RouteDef, Routes } from 'route'
import view from './view'


export default RouteDef<Routes>('', {
  enter: router => (route, child) => view({ child, router, route }),

  children: {
    accueil: page1(),
    todos: page2(),
    notFound: notFound
  }
})