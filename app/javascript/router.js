import Vue from 'vue'
import Router from 'vue-router'
// import Store from './store/index.js'
import firebase from 'firebase'


import Profile from './components/profiles/Profile.vue'
import PostsDetail from './components/posts/PostsDetail.vue'
import PostsNew from './components/posts/PostsNew.vue'
import PostsEdit from './components/posts/PostsEdit.vue'
import LoginForm from "./components/sign/LoginForm.vue"
import Photodetail from 'Photodetail.vue'
import SignupForm  from "./components/sign/SignupForm.vue"
import LoginPage  from "./components/sign/LoginPage.vue"



Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/',
      components:{
        default:Profile 
        // login: LoginForm 
      },
    children:[
      {
        path: 'photo/:id(\\d+)',
        name:'Photodetail',
        components:{
          profile: Photodetail,
        },
       
      }

    ]  
  },
    { path: '/posts/:id(\\d+)',  // :id は数値のみに制限する
      name: 'PostsDetail',
      component: PostsDetail  },
    { path: '/posts/new',
      name: 'PostsNew',
      component: PostsNew    },
    { path: '/posts/:id(\\d+)/edit',
      name: 'PostsEdit',
      component: PostsEdit ,
      props:routes =>({
        id: Number(routes.params.id)  //型をけっていできないので指定する
      })},
      { path: '/user/login',  // :id は数値のみに制限する
      name: 'LoginPage',
      components: {//複数系にすると呼び出せる！！
        noAuth: LoginPage 
      },
      meta: {
        isPublic: true
      },
      children:[
        { path: '/',  // :id は数値のみに制限する
          name: 'LoginForm',
          components: {//複数系にすると呼び出せる！！
            login: LoginForm 
          },
          meta: {
            isPublic: true
          }
          },
          { path: '/user/signup', 
          name: 'SignupForm',
          components: {
            // login: SignupForm 
            login: SignupForm 
          },
          meta: {
            isPublic: true
          }
        }
      ]
    }
    //  },
    //   { path: '/user/login',  // :id は数値のみに制限する
    //   name: 'LoginForm',
    //   components: {//複数系にすると呼び出せる！！
    //     default: LoginForm 
    //   } },
    //   { path: '/user/signup', 
    //   name: 'SignupForm',
    //   components: {
    //     // login: SignupForm 
    //     default: SignupForm 
    //   } },
    

    
  ]
  //   router
})


router.beforeEach((to, from, next) => {
  const isPublic=to.matched.some(page => page.meta.isPublic)
  if (isPublic){
      next()
   }
  else {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
           }
      else{
        next('user/login')
        }
    })
  }    
})

export default router