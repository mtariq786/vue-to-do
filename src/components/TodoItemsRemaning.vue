<template>
    <div>{{remaning}} item left</div>
</template>

<script>
    export default {
        name: "TodoItemsRemaning",
        computed:{
            remaning(){

               return this.$store.getters.remaning;
            }
        }
    }
</script>
