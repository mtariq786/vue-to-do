<template>

    <button v-if="showClearButton" @click="clearCompletedTodo">Clear Completed</button>

</template>

<script>
    export default {
        name: "TodoClearCompleted",
        computed:{
            showClearButton(){
               return this.$store.getters.showClearButton;
            }
        },
        methods:{
            clearCompletedTodo(){

                // eventBus.$emit('clearCompleted');
                // this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
                this.$store.commit('clearCompleted')
            }
        }
    }
</script>

<style scoped>

</style>