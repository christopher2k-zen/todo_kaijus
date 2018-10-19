import './todoItem.sass'
import { h, Message } from 'kaiju'

interface Props {
  todo: Models.Todo
  onInvertState: Message.OnePayload<number>
  onDelete: Message.OnePayload<number>
}

export default function ({ todo, onInvertState, onDelete }: Props) {
  return h('div.card.todo', { class: { done: todo.isDone } }, [
    h('div.card-content.todo-label', todo.label),
    h('div.card-footer.todo-footer', [
      h('button.card-footer-item', { events: { click: onInvertState.with(todo.id) } }, todo.isDone ? `C'est fait !` : 'Pas encore fait.'),
      h('button.card-footer-item', { events: { click: onDelete.with(todo.id) } } ,'Supprimer')
    ])
  ])
} 