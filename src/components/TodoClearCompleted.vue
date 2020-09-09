<template>

    <button v-if="showClearButton" @click="clearCompletedTodo">Clear Completed</button>

</template>

<script>
    export default {
        name: "TodoClearCompleted",
        props:{
            showClearButton:{
                type:Boolean,
                required:true

            }
        },
        methods:{
            clearCompletedTodo(){

                eventBus.$emit('clearCompleted');
            }
        }
    }
</script>

<style scoped>

</style>