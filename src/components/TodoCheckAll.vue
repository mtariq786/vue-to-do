<template>
    <div>
        <label>
            <input type="checkbox" :checked="!anyRemaning" @change="checkAllTodos"> Check All
        </label>
    </div>
</template>

<script>
    export default {
        name: "TodoCheckAll",
        /*props:{
            anyRemaning:{
                type:Boolean,
                required:true
            }
        },*/
        computed:{

            anyRemaning() {
                return this.$store.getters.anyRemaning
            }

        },
        methods:{
            checkAllTodos(){

                this.$store.dispatch('checkAll',event.target.checked);
                // this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked)
                // this.$store.dispatch('CheckAll',event.target.checked);
            }
        }
    }
</script>

<style scoped>

</style>