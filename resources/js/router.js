import homePageComponent from "./components/pages/home_page_component";
import registerPageComponent from "./components/pages/register_page_component";
import loginPageComponent from "./components/pages/login_page_component";
import profilePageComponent from "./components/pages/profile_page_component";
import geksaramaSpisokPageComponent from "./components/pages/geksarama_spisok_page_component";
import geksaramaClickPageComponent from "./components/pages/geksarama_click_page_component";
import HistorePageComponent from "./components/pages/histore_page_component";

import VueRouter from "vue-router";

const routes = [
    {path: "/", component: homePageComponent},
    {path: "/register", component: registerPageComponent},
    {path: "/login", component: loginPageComponent},
    {path: "/profile", component: profilePageComponent},
    {path: "/geksarama-spisok", component: geksaramaSpisokPageComponent},
    {path: "/geksarama-click", component: geksaramaClickPageComponent},
    {path: "/histore", component: HistorePageComponent},
];

export default new VueRouter({
    routes,
    mode: "history"
});
