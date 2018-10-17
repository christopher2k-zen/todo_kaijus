import { log } from 'kaiju'
import { Router } from 'abyssa'
import 'space-lift/es/all'

import classModule from 'snabbdom/es/modules/class'
import propsModule from 'snabbdom/es/modules/props'
import attrsModule from 'snabbdom/es/modules/attributes'

import { startApp } from './common/util/router'
import app from './app'
import notFound from './app/routeNotFound'
import { Routes } from './route'


function start () {
  Router.log = true
  log.render = true
  log.message = true

  const elm: Element = document.querySelector('#app')!

  startApp<Routes>({
    app,
    elm,
    snabbdomModules: [
      classModule,
      propsModule,
      attrsModule
    ],
    notFound
  })
}

start()

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}