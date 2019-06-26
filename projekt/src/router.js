import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const routePropId = (route, name) => {
    const props = { ...route.params };
    props[name] = +props[name];
    return props;
};

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('./views/PanelKibica.vue')
        },
        {
            path: '/login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/konkurs',
            component: () => import('./views/EmptyRouterView.vue'),
            beforeEnter (to, from, next) {
                if (store.state.username !== 'admin') {
                    next('/');
                }
            },
            children: [
                {
                    path: ':namespace',
                    props: true,
                    component: () => import('./components/List.vue')
                }
            ]
        },
        {
            path: '/paneloceniania',
            component: () => import('./views/EmptyRouterView.vue'),
            beforeEnter (to, from, next) {
                if (store.state.username !== 'admin') {
                    next('/');
                }
            },
            children: [
                {
                    path: '',
                    props: true,
                    component: () => import('./views/PanelOceniania.vue'),
                    children: [
                        {
                            path: ':klasaid',
                            props (route) {
                                return routePropId(route, 'klasaid');
                            },
                            component: () => import('./components/konie/KonieTabs.vue'),
                            children: [
                                {
                                    path: ':konid',
                                    props (route) {
                                        const props = { ...route.params };
                                        props.klasaid = +props.klasaid;
                                        props.konid = +props.konid;
                                        return props;
                                    },
                                    component: () => import('./components/konie/KonOcena.vue')
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/panelkibica',
            component: () => import('./views/PanelKibica.vue'),
            children: [
                {
                    path: ':klasaid',
                    props (route) {
                        return routePropId(route, 'klasaid');
                    },
                    component: () => import('./components/konie/KonieWynikList.vue')
                }
            ]
        }
    ]
});
