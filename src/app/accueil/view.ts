import { h, Component, ConnectParams, RenderParams, Node, Message } from 'kaiju'
import { update } from 'space-lift'

import { UserStore, UserState } from './store'


export default function page1(props: Props) {
  return Component<Props, State>({ name: 'page1', props, initState, connect, render })
}

type Props = {
  userStore: UserStore
}

type State = {
  users: UserState['users']
  count: number
}

function initState(props: Props) {
  return {
    users: props.userStore.state().users,
    count: 0
  }
}

const increment = Message('increment')

function connect({ on, props }: ConnectParams<Props, State>) {
  const { userStore } = props()

  on(userStore.state, (state, userState) => update(state, { users: userState.users }))

  on(increment, state => update(state, { count: state.count + 1 }))
}


function render({ state }: RenderParams<Props, State>): Node {
  const { users } = state

  const usersEl = users.type === 'success'
    ? h('ul', users.data.map(u => h('li', u)))
    : h('div', 'page1.loading')

  return h('div', [
    h('p', 'page1.count'),
    h('button', { events: { click: increment } }, 'increment'),
    usersEl
  ])
}