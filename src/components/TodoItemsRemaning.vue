<template>
    <div>{{remaning}} item left</div>
</template>

<script>
    export default {
        name: "TodoItemsRemaning",
        props:{
            remaning:{
                type:Number,
                required:true,
            }
        }
    }
</script>
