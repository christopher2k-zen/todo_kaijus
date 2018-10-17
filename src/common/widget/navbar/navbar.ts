import { Component, h, RenderParams, ConnectParams } from 'kaiju'
import navbarItem from '../navbarItem'
import { Router, Route, Routes, href } from '../../../route'

interface Link {
  label: string
  route: Routes
}

interface Props {
  router: Router
  route: Route
  links: Link[]
}

interface State {}

export default function (props: Props) {
  return Component<Props, State>({ name: 'navbar', props, initState, connect, render })
}

function initState (): State {
  return {}
}

function connect ({}: ConnectParams<Props, State>) {}

function render ({
  props
}: RenderParams<Props, State>) {
  const { router, route, links } = props 

  return (
    h('navbar.navbar.is-dark', [
      h('div.container', [
        h('div.navbar-brand', [
          navbarItem({
            child: `ToDo's`,
            href: href(router, 'accueil', {}),
          })
        ]),
        h('div.navbar-menu', [
          h('div.navbar-end', links.map((link: Link) =>
            navbarItem({
              child: link.label,
              href: href(router, link.route, {}),
              isActive: route.isIn(link.route)
            })
          ))
        ])
      ])
    ])
  )
}

