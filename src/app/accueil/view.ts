import { h, Component, ConnectParams, RenderParams, Node } from 'kaiju'

export default function (props: Props) {
  return Component<Props, State>({ name: 'PageAccueil', props, initState, connect, render })
}

interface Props {}

interface State {}

function initState() {
  return {}
}

function connect({}: ConnectParams<Props, State>) {
}

function render({}: RenderParams<Props, State>): Node {
  return (
    h('div', [
      h('p', 'Hello'),
    ])
  )
}