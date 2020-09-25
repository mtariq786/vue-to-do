<template>

    <div id="app">


    <ul class="nav">
      <!--  <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>-->

        <li><router-link :to="{name: 'home'} ">Home</router-link></li>
        <li><router-link :to="{name: 'app'}">App</router-link></li>
        <li><router-link :to="{name: 'about'}">About</router-link></li>
        <li v-if="!loggedIn"><router-link :to="{name: 'login'}">Login</router-link></li>
        <li v-if="!loggedIn"><router-link :to="{name: 'register'}">Register</router-link></li>
        <li v-if="loggedIn"><router-link :to="{name: 'logout'}">Logout</router-link></li>
    </ul>

       <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Master",
        computed : {
            loggedIn(){
                return this.$store.getters.loggedIn;

            }
        }
    }
</script>

<style>

    @import url('cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 18px;
        height: 100vh;
    }

    .flex-center {
        display: flex;
        justify-content: center;
    }
    .nav {
        display: flex;
        list-style: none;
        padding: 15px 0;
        margin: 0;
        justify-content: flex-end;
        background: #F5F8FA;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 24px;
    }
    .nav a {
        color: #636b6f;
        padding: 0 25px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }
    /*auth routes*/

    label {
        display: block;
        margin-bottom: 4px;
    }
    .login-heading {
        margin-bottom: 16px;
    }
    .form-control {
        margin-bottom: 24px;
    }
    .mb-more {
        margin-bottom: 42px;
    }
    .login-form {
        max-width: 500px;
        margin: auto;
    }
    .login-input {
        width: 100%;
        font-size: 16px;
        padding: 12px 16px;
        outline: 0;
        border-radius: 3px;
        border: 1px solid lightgrey;
    }
    .btn-submit {
        width: 100%;
        padding: 14px 12px;
        font-size: 18px;
        font-weight: bold;
        background: #60BD4F;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    &:hover {
         background: darken(#60BD4F, 10%);
     }
    }

    .error-messages{
        margin-bottom: 20px;
        font-size: 18px;
        padding: 10px 16px;
        color: #a94442;
        background: #F3DEDE;
        border-radius: 4px;: 4px;
    }
    /*.form-errors {
        color: #a94442;
        font-size: 15px;
    }
    .input-error{
        border: 1px solid red;
    }*/
    .control {
        width: 100%;
    }

    .control span {
        display: block;
    }

    .control input {
        padding: 5px 10px;
    }

    .control.invalid input,
    .control.invalid span {
        color: #eb0600;
    }

    .control.invalid input {
        border: 1px #eb0600 solid;
    }

    .control.valid input,
    .control.valid span {
        color: #045929;
    }

    .control.valid input {
        border: 1px #045929 solid;
    }

    .success-message {
        background-color: #dff0d8;
        color: #3c763d;
        margin-bottom: 12px;
        font-size: 16px;
        padding: 10px 16px;
        border-radius: 4px;
    }


</style>