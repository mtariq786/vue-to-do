<template>
    <div>
        <input type="text" placeholder="type some text" class="todo-input" v-model="newToDo"
               @keyup.enter="addTodo">
        <todo-item v-for="(todo,index) in todosFiltered" :key="todo.id" :todo="todo" :index="index"
                   :checkAll="!anyRemaning">
        <!--@removedTodo="removeTodo" @finishedEdit ="finishedEdit" >-->

        </todo-item>

        <div class="extra-container">
            <TodoCheckAll :anyRemaning="anyRemaning"></TodoCheckAll>

            <TodoItemsRemaning :remaning="remaning"></TodoItemsRemaning>
        </div>

        <div class="extra-container">
            <TodoFilters></TodoFilters>
            <div>
                <TodoClearCompleted :showClearButton ="showClearButton"></TodoClearCompleted>
                <!--<button v-if="showClearButton" @click="clearCompletedTodo">Clear Completed</button>-->
            </div>
        </div>
    </div>
</template>

<script>

    import TodoItem from './TodoItem'
    import TodoItemsRemaning from './TodoItemsRemaning'
    import TodoCheckAll from './TodoCheckAll'
    import TodoFilters from './TodoFilters'
    import TodoClearCompleted from "./TodoClearCompleted";

    export default {
        name: 'todo-list',
        components: {
            TodoClearCompleted,
            TodoItem,
            TodoItemsRemaning,
            TodoCheckAll,
            TodoFilters
        },
        data() {
            return {
                newToDo: '',
                beforeEditCache: '',
                todoId: 3,
                filter: 'all',
                todos: [
                    {
                        'id': 1,
                        'title': 'Finish vue screen cast',
                        'completed': false,
                        'editing': false
                    },
                    {
                        'id': 2,
                        'title': 'Complete whole series',
                        'completed': false,
                        'editing': false
                    }
                ]
            }
        },
        created(){
            eventBus.$on('removedTodo',(index)    => this.removeTodo(index));
            eventBus.$on('finishedEdit',(data)    => this.finishedEdit(data));
            eventBus.$on('checkAll',(checked)     => this.checkAllTodos(checked));
            eventBus.$on('filterChanged',(filter) => this.filter = filter);
            eventBus.$on('clearCompleted',() =>this.clearCompletedTodo() );

        },
        beforeDestroy(){
            eventBus.$off('removedTodo',(index)    => this.removeTodo(index));
            eventBus.$off('finishedEdit',(data)    => this.finishedEdit(data));
            eventBus.$off('checkAll',(checked)     => this.checkAllTodos(checked));
            eventBus.$off('filterChanged',(filter) => this.filter = filter);
            eventBus.$off('clearCompleted',() =>this.clearCompletedTodo() );
        },

        computed: {
            remaning() {

                return this.todos.filter(todo => !todo.completed).length;
            },
            anyRemaning() {

                return this.remaning != 0;

            },
            todosFiltered() {
                if (this.filter == 'all') {
                    return this.todos
                } else if (this.filter == 'active') {
                    return this.todos.filter(todo => !todo.completed)
                } else if (this.filter == 'completed') {
                    return this.todos.filter(todo => todo.completed);
                } else {

                    this.todos
                }
            },
            showClearButton() {

                return this.todos.filter(todo => todo.completed).length > 0;
            }
        },
        methods: {
            addTodo() {

                if (this.newToDo.trim().length == 0) {
                    return;
                }
                this.todos.push({

                    id: this.todoId,
                    title: this.newToDo,
                    completed: false,
                });

                this.newToDo = '';
                this.todoId++
            },

            editTodo(todo) {

                this.beforeEditCache = todo.title;
                todo.editing = true;
            },

            doneEdit(todo) {

                if (todo.trim() == '') {
                    return;
                }
                todo.editing = false;
            },

            removeTodo(index) {

                this.todos.splice(index, 1);

            },
            cancelEdit(todo) {
                todo.editing = false
                todo.title = this.beforeEditCache;


            },
            checkAllTodos() {

                this.todos.forEach((todo) => todo.completed = event.target.checked)

            },
            clearCompletedTodo() {

                this.todos = this.todos.filter(todo => !todo.completed)
            },
            finishedEdit(data){

                this.todos.splice(data.index,1,data.todo)
            }
        }
    }
</script>

<style>


    .todo-input {

        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;

    &
    :focus {

        color: black;
    }

    }
    .remove-item {
        cursor: pointer;
        margin-left: 14px;

    &
    :hover {

        color: black;
    }

    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {

        width: 100%;
        margin-left: 12px;
        padding: 10px;
        border: 1px solid #ccc;

    &
    :focus {
        outline: none;
    }

    }

    /*line throug*/

    .completed {
        text-decoration: line-through;
        color: grey;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid lightgray;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;

    &
    :hover {
        background: green;
    }

    &
    :focus {
        outline: none;
    }

    }
    .active {
        background: green;
    }


</style>


