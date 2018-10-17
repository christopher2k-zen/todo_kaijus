import { RouteDef, Routes } from 'route'
import view from './view'


export default function () {
  return RouteDef<Routes>('/todos', {
    enter: () => () => view(),
    children: {}
  })
}
