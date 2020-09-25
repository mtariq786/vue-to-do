<template>


    <div class="login-form">
        <h2 class="login-heading">Register</h2>
        <!--<ValidationObserver v-slot="{ invalid }">-->
        <form action="#" @submit.prevent="register">
            <!--<div class="success-message" v-if="successMessage">{{successMessage}}</div>-->

            <div class="error-messages" v-if="serverErrors">
                <div v-for="(value, key) in serverErrors" :key="key">
                    {{value[0]}}
                </div>
            </div>

            <div class="form-control">
                <label for="name">Name</label>
               <!-- <ValidationProvider name="name" rules="required|alpha" v-slot="{ errors,classes }">
                    &lt;!&ndash;<input v-model="name" type="text">&ndash;&gt;
                    &lt;!&ndash;<input type="text" name="name" id="name" class="login-input"  >

                    <span>{{ errors[0] }}</span>&ndash;&gt;

                    <div class="control" :class="classes">
                        <input type="text" name="name" id="name" class="login-input">
                        <span>{{ errors[0] }}</span>
                    </div>
                </ValidationProvider>-->

                <ValidationProvider
                        name="field"
                        rules="required"
                        :bails="false"
                        v-slot="{classes,errors}"
                >
                    <div class="control" :class="classes">
                        <input type="text" name="name" id="name" class="login-input" v-model="name" >
                        <span>{{ errors[0] }}</span>
                    </div>
                </ValidationProvider>

            </div>

            <div class="form-control">
                <label for="email">Email</label>
                <!--<ValidationProvider name="email" rules="required|email" v-slot="{ errors }" >
                    <input type="email" name="email" id="email" class="login-input" v-model="username">
                    <span class="form-errors">{{ errors[0] }}</span>
                </ValidationProvider>-->

                <ValidationProvider
                        name="field"
                        rules="required|min:3|email|max:100"
                        :bails="false"
                        v-slot="{classes,errors}"
                >
                    <div class="control" :class="classes">
                        <input type="email" name="email" id="email" class="login-input" v-model="username">
                        <span>{{ errors[0] }}</span>
                    </div>
                </ValidationProvider>
            </div>

            <div class="form-control mb-more">
                <label for="password">Password</label>
               <!-- <ValidationProvider>
                    <ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">

                        <input type="password" name="password" id="password" class="login-input" v-model="password">
                        <span class="form-errors">{{ errors[0] }}</span>
                    </ValidationProvider>

                </ValidationProvider>

-->

                <ValidationProvider
                        name="field"
                        rules="required|min:8"
                        :bails="false"
                        v-slot="{classes,errors}"
                >
                    <div class="control" :class="classes">
                        <input type="password" name="password" id="password" class="login-input" v-model="password">
                        <span>{{ errors[0] }}</span>
                    </div>
                </ValidationProvider>

            </div>

            <div class="form-control">
                <!--<button type="submit" class="btn-submit" :disabled="invalid">Create Account</button>-->
                <button type="submit" class="btn-submit">Create Account</button>
            </div>

        </form>
        <!--</ValidationObserver>-->
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {

            return {
                name: '',
                username: '',
                password: '',
                serverErrors: '',
                successMessage: '',
            }
        },
        methods: {

            register() {

                this.$store.dispatch('registerUser', {
                    name: this.name,
                    username: this.username,
                    password: this.password,
                }).then(response => {

                    this.successMessage = 'Register successfully';
                    this.$router.push({name: 'login',params:{
                        dataSuccessMessage : this.successMessage
                        }});
                    this.$toast.success({
                        title:'Register Successfully',
                        message:'You can login now'
                    });
                }).catch(error => {

                    // this.serverErrors = Object.values(error.response.)

                    this.serverErrors = Object.values(error.response.data.errors);

                })


            }
        }
    }
</script>
