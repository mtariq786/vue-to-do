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
        props:{
            anyRemaning:{
                type:Boolean,
                required:true
            }
        },
        methods:{
            checkAllTodos(){

                eventBus.$emit('checkAll',this.anyRemaning);
            }
        }
    }
</script>

<style scoped>

</style>