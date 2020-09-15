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
    },
    mutations:{
       addTodo(state,todo){
          state.todos.push({
              id : todo.id,
              title:todo.title,
              completed:false,
              editing:false,
          })

       },
        clearCompleted(state){

            state.todos = state.todos.filter(todo => !todo.completed)

        },
        ChangeFilter(state,filter){
            state.filter = filter
        },
        CheckAll(state){

           state.todos.forEach((todo) => todo.completed = event.target.checked)
        },
        deleteToDo(state,id){
            const index = state.todos.findIndex(item => item.id === id);
            state.todos.splice(index, 1);
        },
        updateTodo(state,todo){
            const  index = state.todos.findIndex(item => item.id === todo.id);
            state.todos.splice(index,1,{
                'id':todo.id,
                'title':todo.title,
                'completed':todo.completed,
                'editing':todo.editing,
            })
        }
    },
    actions:{
        addTodo(context,todo){

            setTimeout(()=>{

                context.commit('addTodo',todo);
            },1000)
        },
        clearCompleted(context){

            setTimeout(()=>{
                context.commit('clearCompleted');

            },1000)

        },
        ChangeFilter(context,filter){

            setTimeout(()=>{

                context.commit('ChangeFilter',filter);
            },1000)

        },
        CheckAll(context){
            setTimeout(()=>{
                context.commit('CheckAll');

            },1000)


        },
        deleteToDo(context){
            setTimeout(()=>{
                context.commit('deleteToDo');

            },1000)

        },

        updateTodo(context,todo){
            setTimeout(()=>{
                context.commit('updateTodo',todo);

            },1000)
        }
    }
});

