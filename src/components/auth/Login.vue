<template>
    <div class="login-form">
        <h2 class="login-heading">Login</h2>
        <form action="#" @submit.prevent="login">

            <div class="success-message" v-if="successMessage">{{successMessage}}</div>

            <div class="error-messages" v-if="serverError">
               {{serverError}}
            </div>
            <div class="form-control">
                <label for="email">Username/Email</label>
                <input type="email" name="username" id="username" class="login-input" v-model="username" >
            </div>

            <div class="form-control mb-more">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="login-input" v-model="password">
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit">Login</button>
            </div>

        </form>
    </div>
</template>
<script>
    export default {
        name: "Login",

        props: {

            dataSuccessMessage:{
                type: String,
            }
        },
        data(){
           return {
               username : '',
               password : '',
               serverError :'',
               successMessage:this.dataSuccessMessage
           }
        },

        methods: {

            login(){
                this.$store.dispatch('retrieveToken',{
                    username: this.username,
                    password: this.password,
                })
                    .then(response => {

                        this.$router.push({name: 'app'})

                    }).catch(errors => {

                        this.password =  ''
                        this.serverError =errors.response.data,
                            this.successMessage = ''
                })

            }

        }
    }

</script>

<style scoped>

</style>