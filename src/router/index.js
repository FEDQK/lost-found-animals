import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
import Profile from '@/components/User/Profile';
import Moderation from '@/components/Moderation';
import AuthGuard from './auth-guard';

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
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/moderation',
      name: 'Moderation',
      component: Moderation,
      beforeEnter: AuthGuard,
    },
  ],
  mode: 'history',
});
