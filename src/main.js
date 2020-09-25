// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Master from './components/layouts/Master'
import {store} from './store/store'
import routes from './routes'
// import * as VeeValidate from 'vee-validate';
import {ValidationProvider,ValidationObserver,extend} from 'vee-validate/dist/vee-validate.full';
import CxltToastr from 'cxlt-vue2-toastr'



const toastrConfigs = {
    position: 'bottom right',
    showDuration: 2000,
    timeOut: 5000,
    progressBar:true
}
Vue.use(CxltToastr, toastrConfigs)

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.eventBus = new Vue();

Vue.use(VueRouter)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
const router = new VueRouter({

    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'app',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})


new Vue({
    el: '#app',
    store: store,
    router: router,
    components: {
        Master,

    },

    template: '<Master/>'
});
