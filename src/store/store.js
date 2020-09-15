import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({

   state: {
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
           },
       ]
   },
    getters:{
        remaning(state) {

            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaning(state,getters) {

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
    }
});

