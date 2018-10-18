import { h } from 'kaiju'

interface Props {
  todos: Models.Todo[]
}

export default function ({ todos }: Props) {
  return (
    h('div.columns', [
      h('div.column.is-8.is-offset-2', `${JSON.stringify(todos)}`)
    ])
  )
}