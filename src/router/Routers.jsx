import About from "../pages/About";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";

export const PrivateRoutes = [
    { path: '/about', component: About },
    { path: '/posts', component: Posts },
    { path: '/posts/:id', component: PostIdPage },
];

export const PublicRoutes = [
    { path: '/login', component: Login },

]