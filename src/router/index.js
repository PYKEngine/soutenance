import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Error404 from "../views/404.vue";
import ChatRoom from "../views/ChatRoom.vue";
import Login from "../views/authentication/Login.vue";
import Register from "../views/authentication/Register.vue";
import Dashboard from "../views/user/Dashboard.vue";
import Member from "../views/user/Member.vue";
import Messages from "../views/user/Messages.vue";
import Network from "../views/user/Network.vue";
import Profile from "../views/user/Profile.vue";
import GitRepos from "../views/user/GithubRepos.vue";
import CreateProfile from "../views/user/CreateProfile.vue";
import AddEducation from "../views/user/AddEducation.vue";
import AddExperience from "../views/user/AddExperience.vue";
import User from "../views/user/User.vue";
import Post from "../views/post/Post.vue";
import Wall from "../views/post/Wall.vue";
import AdminLogin from "../views/admin/Login.vue";
import AdminDashboard from "../views/admin/Dashboard.vue";

import * as auth from "../services/AuthService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next("/profile/me");
      }
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next("/profile/me");
      }
    }
  },
  {
    path: "/chat",
    name: "chatroom",
    component: ChatRoom,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile/me",
    name: "profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile/github/:id",
    name: "git-repos",
    component: GitRepos,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile/edit",
    name: "edit-profile",
    component: CreateProfile,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile/add-experience",
    name: "add-experience",
    component: AddExperience,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile/add-education",
    name: "add-education",
    component: AddEducation,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile/user/:id",
    name: "user",
    component: User,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/messages",
    name: "messages",
    component: Messages,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/network",
    name: "network",
    component: Network,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/members",
    name: "members",
    component: Member
  },
  {
    path: "/wall",
    name: "wall",
    component: Wall,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/post/:id",
    name: "post",
    component: Post,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: AdminLogin,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next("/admin/dashboard");
      }
    }
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/admin/login");
      }
    }
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/404",
    name: "404",
    component: Error404
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
