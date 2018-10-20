import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
import Profile from '@/components/User/Profile';
import AuthGuard from './auth-guard';
import CheckAuth from './check-auth';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    // {
    //   path: '/meetup/new',
    //   name: 'CreateMeetup',
    //   component: CreateMeetup,
    //   beforeEnter: AuthGuard,
    // },
    // {
    //   path: '/meetups/:id',
    //   name: 'Meetup',
    //   props: true,
    //   component: Meetup,
    // },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      beforeEnter: CheckAuth,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      beforeEnter: CheckAuth,
    },
  ],
  mode: 'history',
});
