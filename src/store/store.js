import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

axios.defaults.baseURL = 'http://todo.local/api'
export const store = new Vuex.Store({

    state: {
        filter: 'all',
        todos: [],
        token: localStorage.getItem('access_token') ||  null,
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
        },
        loggedIn(state){
            return state.token !== null;
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
            const index = state.todos.findIndex(item => item.id == id);
            state.todos.splice(index, 1);
        },

        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id == todo.id);
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing,
            })
        },
        retrieveToken(state,token){

            // console.log(token);
            state.token = token;
            // console.log(state.token);
        },
        destroyToken(state){
            state.token = null;
        },
        destroyTodos(state){
          state.todos = [];
        }
    },
    actions: {


        retrieveName(context){
            return  new Promise((resolve, reject) => {

                axios.get('/user').then(response => {
                    resolve(response)

                }).catch(error =>{

                    reject(error)
                })

            });
        },

        destroyTodos(context){

            context.commit('destroyTodos');
        },
        retriveTodos(context) {

            axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token;
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

        },

        registerUser(context,data){
            return  new Promise((resolve, reject) => {

                axios.post('/register',{

                    name: data.name,
                    email: data.username,
                    password: data.password

                }).then(response => {
                    const token  = response.data.access_token;
                    // localStorage.setItem('access_token',token);
                    // context.commit('retrieveToken',token);
                    resolve(response)

                }).catch(error =>{

                    console.log(error)
                    reject(error)
                })

            });
        },

        retrieveToken(context,data){

            return  new Promise((resolve, reject) => {

                axios.post('/login',{

                    username: data.username,
                    password: data.password

                }).then(response => {
                    const token  = response.data.access_token;
                    // console.log(response.data.access_token);
                    localStorage.setItem('access_token',token);
                    context.commit('retrieveToken',token);
                    resolve(response)

                }).catch(error =>{

                    console.log(error)
                    reject(error)
                })

            });

        },

        destroyToken(context){

            axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token;
            if(context.getters.loggedIn){

                return  new Promise((resolve, reject) => {

                    axios.post('/logout').then(response => {

                        localStorage.removeItem('access_token');
                        context.commit('destroyToken');
                        resolve(response)

                    }).catch(error =>{

                        localStorage.removeItem('access_token');
                        context.commit('destroyToken');
                        reject(error)
                    })

                });


            }
        }


    }
});

