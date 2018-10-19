import { Store, Message } from 'kaiju'
import { RegisterHandlersParams } from 'kaiju/commonjs/store'
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
  return Store<TodoState>(initialState, ({ on, state }: RegisterHandlersParams<TodoState>) => {
    on(addTodo, (payload: string) => {
      const _state: TodoState = state()
      const todo: Models.Todo = { id: _getNextId(_state.todos), label: payload, isDone: false }
      _dbAddTodo(todo)
  
      return lift<TodoState>(_state)
        .add('todos', lift(_state.todos).append(todo).value())
        .value()
    })
  
    on(modifyTodo, (payload: Models.Todo) => {
      const _state: TodoState = state()
      _dbUpdateTodo(payload)
      return lift<TodoState>(_state)
        .add(
          'todos',
          lift(_state.todos)
            .updateAt(
              _state.todos.findIndex(t => t.id === payload.id),
              () => payload
            )
            .value()
        )
        .value()
    })
  
    on(deleteTodo, (payload: number) => {
      const _state: TodoState = state()
      _dbDeleteTodo(payload)
      return lift<TodoState>(_state)
        .add(
          'todos',
          lift(_state.todos).filter(t => t.id !== payload).value()
        )
        .value()
    })
  
    on(invertTodoState, (payload: number) => {
      const _state: TodoState = state()
      let todoIndex: number = _state.todos.findIndex(t => t.id === payload)
      if (todoIndex === -1) {
        console.warn('Todo not found ! So, something went wrong')
        return _state
      } else {
        const todo: Models.Todo = { ..._state.todos[todoIndex], isDone: !_state.todos[todoIndex].isDone }
        _dbUpdateTodo(todo)
        return lift<TodoState>(_state)
          .add(
            'todos',
            lift(_state.todos).updateAt(todoIndex, () => todo).value()
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


