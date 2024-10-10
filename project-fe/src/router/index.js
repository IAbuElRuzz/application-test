
import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '../components/SignUp.vue';
import SignIn from '../components/SignIn.vue';
import Welcome from '../components/Welcome.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '*',
      redirect: '/signup'
    }
  ]
});
    