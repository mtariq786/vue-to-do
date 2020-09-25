<template>
    
</template>

<script>
    export default {
        name: "Logout",
        created(){
            this.$store.dispatch('destroyTodos');
            this.$store.dispatch('destroyToken')
                .then(response=>{

                    this.$router.push({name: 'home'});

                });
        }
    }
</script>

<style scoped>

</style>