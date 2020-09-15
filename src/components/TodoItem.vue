<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit">
            <div v-if="!editing" class="todo-item-label" :class="{completed : completed}"
                 @dblclick="editTodo">{{title}}
            </div>
            <input v-else v-focus type="text" v-model="title" class="todo-item-edit"
                   @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit(todo)">
        </div>
        <div>
            <button @click="pluralize">Plural</button>
            <span class="remove-item" @click="removeTodo(index)">
                &times;
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "todo-item",
        props:{
            todo:{
                type:Object,
                required:true,
            },
            index:{
                type:Number,
                required: true,
            },
            checkAll:{
                type:Boolean,
                required:true
            }

        },
        data(){

           return {
               'id':this.todo.id,
               'title':this.todo.title,
               'completed':this.todo.completed,
               'editing':this.todo.editing,
               'beforeEditCache': '',
           }

        },
        created(){
          eventBus.$on('pluralize',this.handlePluralize);
        },
        beforeDestroy(){
            eventBus.$off('pluralize',this.handlePluralize);
        },
        directives: {
            focus: {
                // directive definition
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        methods:{

            removeTodo(id){

                // eventBus.$emit('removedTodo',index);
                const index = this.$store.state.todos.findIndex(item => item.id === id);
                this.$store.state.todos.splice(index, 1);
            },
            editTodo() {

                this.beforeEditCache = this.title;
                this.editing = true;
            },
            doneEdit() {

                if (this.title.trim() == '') {
                    return;
                }
                this.editing = false;
                const  index = this.$store.state.todos.findIndex(item => item.id === this.id);
                this.$store.state.todos.splice(index,1,{
                    'id':this.id,
                    'title':this.title,
                    'completed':this.completed,
                    'editing':this.editing,
                })
                /*eventBus.$emit('finishedEdit',{
                    'index':this.index,
                    'todo':{
                        'id':this.id,
                        'title':this.title,
                        'completed':this.completed,
                        'editing':this.editing,
                    }
                })*/
            },
            cancelEdit() {
                this.editing = false
                this.title = this.beforeEditCache;
            },
            pluralize(){

                eventBus.$emit('pluralize');
            },
            handlePluralize(){
                this.title = this.title + 's';
                /*eventBus.$emit('finishedEdit',{
                    'index':this.index,
                    'todo':{
                        'id':this.id,
                        'title':this.title,
                        'completed':this.completed,
                        'editing':this.editing,
                    }
                })*/
                const  index = this.$store.state.todos.findIndex(item => item.id === this.id);
                this.$store.state.todos.splice(index,1,{
                    'id':this.id,
                    'title':this.title,
                    'completed':this.completed,
                    'editing':this.editing,
                })
            }
        },
        watch:{
            checkAll(){
                /*if(this.checkAll){
                    this.completed = true;
                }else{
                    this.completed = this.todo.completed;
                }*/
                this.completed = this.checkAll ? true : this.todo.completed
            }
        }
    }
</script>

<style scoped>

</style>