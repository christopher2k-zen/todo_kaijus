import { RouteDef, Routes } from 'route'

import Store, { TodoStore } from './store'
import view from './view'

export default function () {
  let store: TodoStore
  return RouteDef<Routes>('/todos', {
    enter: () => {
      store = Store()
      return () => view({ store })
    },
    exit: () => {
      store.destroy()
    },
    children: {}
  })
}
