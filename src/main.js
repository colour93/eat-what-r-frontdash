import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import './style.css';
import App from './App.vue';

import Overview from './views/Overview.vue';
import Sheet from './views/Sheet.vue';

const routes = [
    {
        path: '/',
        component: Overview
    },
    {
        path: '/manage/:viewType',
        component: Sheet,
        // props: route => ({
        //     viewType: route.params.viewType,
        //     id: route.query.id
        // })
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
};

app.use(router);

app.config.globalProperties.$apiUrl = 'http://127.0.0.1:16134';

app.mount('#app');