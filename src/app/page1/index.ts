import { RouteDef, Routes } from 'route'
import Store, { UserStore } from './store'
import view from './view'


export default function route() {

  let userStore: UserStore

  return RouteDef<Routes>('', {
    enter: () => {
      userStore = Store()
      return () => view({ userStore })
    },
    exit: () => {
      userStore.destroy()
    },
    children: {}
  })
}

