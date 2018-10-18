import { Store, Message } from 'kaiju'
import { RegisterMessages } from 'kaiju/commonjs/store'
import lift from 'space-lift'

const storageKey: string = 'KAIJU_TODOS'

export const addTodo = Message<string>('addTodo')
export const modifyTodo = Message<Models.Todo>('modifyTodo')
export const deleteTodo = Message<number>('deleteTodo')
export const invertTodoState = Message<number>('invertTodoState')

export interface TodoState {
  todos: Models.Todo[]
}

export type TodoStore = Store<TodoState>

const initialState = { todos: _getSavedTodos() }

export default function () {
  return Store<TodoState>(initialState, (on: RegisterMessages<TodoState>) => {
    on(addTodo, (state: TodoState, payload: string) => {
      const todo: Models.Todo = { id: _getNextId(state.todos), label: payload, isDone: false }
      _dbAddTodo(todo)
  
      return lift<TodoState>(state)
        .add('todos', lift(state.todos).append(todo))
        .value()
    })
  
    on(modifyTodo, (state: TodoState, payload: Models.Todo) => {
      _dbUpdateTodo(payload)
      return lift<TodoState>(state)
        .add(
          'todos',
          lift(state.todos)
            .updateAt(
              state.todos.findIndex(t => t.id === payload.id),
              () => payload
            )
        )
        .value()
    })
  
    on(deleteTodo, (state: TodoState, payload: number) => {
      _dbDeleteTodo(payload)
      return lift<TodoState>(state)
        .add(
          'todos',
          lift(state.todos).filter(t => t.id !== payload)
        )
        .value()
    })
  
    on(invertTodoState, (state: TodoState, payload: number) => {
      let todoIndex: number = state.todos.findIndex(t => t.id === payload)
      if (todoIndex === -1) {
        console.warn('Todo not found ! So, something went wrong')
        return state
      } else {
        const todo: Models.Todo = { ...state.todos[todoIndex], isDone: !state.todos[todoIndex].isDone }
        _dbUpdateTodo(todo)
        return lift<TodoState>(state)
          .add(
            'todos',
            lift(state.todos).updateAt(todoIndex, () => todo)
          )
          .value()
      }
    })
  })
}

function _getSavedTodos (): Models.Todo[] {
  const stringifiedTodos: string | null = window.localStorage.getItem(storageKey)
  if (stringifiedTodos != null) {
    return JSON.parse(stringifiedTodos) as Models.Todo[]
  }
  return []
}


function _getNextId (todo: Models.Todo[]): number {
  return todo.reduce((id, todo) => todo.id > id ? todo.id : id, 0)
}

function _dbAddTodo (todo: Models.Todo): void {
  const stringifiedTodos: string | null = window.localStorage.getItem(storageKey)  
  const toSave: Models.Todo[] = stringifiedTodos != null ? [...JSON.parse(stringifiedTodos), todo] : [todo]
  window.localStorage.setItem(storageKey, JSON.stringify(toSave))
}

function _dbDeleteTodo (id: number): void {
  const stringifiedTodos: string | null = window.localStorage.getItem(storageKey)
  const toSave: Models.Todo[] = stringifiedTodos != null ?
    (JSON.parse(stringifiedTodos) as Models.Todo[]).filter(todo => todo.id !== id) :
    []
  window.localStorage.setItem(storageKey, JSON.stringify(toSave))
}

function _dbUpdateTodo (todo: Models.Todo): void {
  const stringifiedTodos: string | null = window.localStorage.getItem(storageKey)
  const toSave: Models.Todo[] = stringifiedTodos != null ?
    [
      ...(JSON.parse(stringifiedTodos) as Models.Todo[])
        .filter(t => todo.id !== t.id),
      todo
    ].sort((a: Models.Todo, b: Models.Todo) => a.id - b.id) : [todo]

  window.localStorage.setItem(storageKey, JSON.stringify(toSave))
}


