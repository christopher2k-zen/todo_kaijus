import { h, Component, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'space-lift'

import { TodoState, TodoStore, deleteTodo, invertTodoState } from './store'
import todoList from '../../common/widget/todoList/todoList'

interface Props {
  store: TodoStore
}

interface State {
  todos: Models.Todo[]
}

export default function (props: Props) {
  return Component<Props, State>({ name: 'TodoView', props, initState, connect, render })
}

function initState (props: Props): State {
  return {
    todos: props.store.state().todos
  }
}

function connect ({ on, props, state }: ConnectParams<Props, State>) {
  const { store } = props()
  on(store.state, (todoState: TodoState) => update(state(), { todos: todoState.todos }))
  on(deleteTodo, (id: number) => store.send(deleteTodo(id)))
  on(invertTodoState, (id: number) => store.send(invertTodoState(id)))
}

function render ({ state }: RenderParams<Props, State>) {
  const { todos } = state
  
  return (
    h('div.container', [
      h('h1.title.is-1', 'Liste des tâches'),
      todoList({
        todos,
        onInvertState: invertTodoState,
        onDelete: deleteTodo
      })
    ])
  )
}