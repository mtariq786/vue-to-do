import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
export const store = new Vuex.Store({

    state: {
        filter: 'all',
        todos: [
            /*{
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
            },*/
        ]
    },
    getters: {
        remaning(state) {

            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaning(state, getters) {

            return getters.remaning != 0;

        },
        todosFiltered(state) {
            if (state.filter == 'all') {
                return state.todos
            } else if (state.filter == 'active') {
                return state.todos.filter(todo => !todo.completed)
            } else if (state.filter == 'completed') {
                return state.todos.filter(todo => todo.completed);
            } else {

                state.todos
            }
        },
        showClearButton(state) {

            return state.todos.filter(todo => todo.completed).length > 0;
        }
    },
    mutations: {


        retriveTodos(state, todos) {

            state.todos = todos

        },

        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false,
            })

        },
        clearCompleted(state) {

            state.todos = state.todos.filter(todo => !todo.completed)

        },
        ChangeFilter(state, filter) {
            state.filter = filter
        },
        checkAll(state, checked) {

            state.todos.forEach(todo => (todo.completed = checked))
        },
        deleteToDo(state, id) {
            const index = state.todos.findIndex(item => item.id === id);
            state.todos.splice(index, 1);
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id);
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing,
            })
        }
    },
    actions: {

        retriveTodos(context) {
            axios.get('/todos')
                .then(response => {
                    context.commit('retriveTodos', response.data);
                }).catch(errors => {

                console.log(errors)
            });
        },
        addTodo(context, todo) {

            axios.post('/todos', {

                title: todo.title,
                completed: false,

            }).then(response => {
                context.commit('addTodo', todo);
            }).catch(errors => {

                console.log(errors)
            });

        },

        updateTodo(context, todo) {

            axios.patch('/todos/' + todo.id, {
                title: todo.title,
                completed: todo.completed,
            }).then(response => {
                context.commit('updateTodo', response.data);
            }).catch(errors => {
                console.log(errors);
            });
            /* setTimeout(() => {
                 context.commit('updateTodo', todo);

             }, 1000)*/
        },

        deleteToDo(context, id) {

            axios.delete('/todos/' + id)
                .then(response => {
                    context.commit('deleteToDo', id);
                })
                .catch(errors => {

                    console.log(errors);

                });
            /*setTimeout(() => {
                context.commit('deleteToDo');

            }, 1000)*/

        },
        clearCompleted(context) {

            //lets get array of all completed first

            const completed = context.state.todos
                .filter(todo => todo.completed)
                .map(todo => todo.id)


            axios.post('/todosDeleteAll',{
                todos : completed
            })
                .then(response => {
                    context.commit('clearCompleted');

                }).catch(errors => {
                console.log(errors);
            })


        },
        ChangeFilter(context, filter) {

            // setTimeout(() => {

            context.commit('ChangeFilter', filter);
            // }, 1000)

        },
        checkAll(context, checked) {

            axios.patch('todos-check-all', {
                completed: checked
            })
                .then(response => {
                    context.commit('checkAll', checked);

                }).catch(errors => {
                console.log(errors);
            })

        }

    }
});

