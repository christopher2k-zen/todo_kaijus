import { h, Message } from 'kaiju'

import todoItem from '../todoItem'

interface Props {
  todos: Models.Todo[]
  onInvertState: Message.OnePayload<number>
  onDelete: Message.OnePayload<number>
}

export default function ({ todos, onInvertState, onDelete }: Props) {
  return (
    h('div.columns', [
      h('div.column.is-8.is-offset-2', todos.length === 0 ?
        'Pas de todos !' :
        todos.map(
          todo => todoItem({
            todo,
            onInvertState,
            onDelete
          })
        )
      )
    ])
  )
}