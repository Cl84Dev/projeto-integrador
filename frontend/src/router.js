import { createWebHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import Signup from "./pages/Signup.vue";
import Login from "./pages/Login.vue";
import Account from "./pages/Account.vue";
import CreateAccount from "./pages/CreateAccount.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  { path: "/account", component: Account },
  { path: "/create-account", component: CreateAccount },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
