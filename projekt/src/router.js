import Vue from 'vue';
import Router from 'vue-router';
import PanelKibica from './views/PanelKibica.vue';

Vue.use(Router);

const routePropId = (route) => {
    const props = { ...route.params };
    props.id = +props.id;
    return props;
};

export default new Router({
    routes: [
        {
            path: '/',
            name: 'panelkibica',
            component: PanelKibica
        },
        {
            path: '/paneloceniania',
            component: () => import('./views/PanelOceniania.vue'),
            children: [
                {
                    path: '/klasa/:klasaid/kon/:konid',
                    component: () => import('./components/Ocenianie')
                }
            ]
        },
        {
            path: '/konkurs',
            name: 'konkurs',
            component: () => import('./views/Konkurs.vue'),
            children: [
                {
                    path: 'konie',
                    component: () => import('./components/KonieList.vue'),
                    children: [
                        {
                            path: ':id',
                            props: route => routePropId(route),
                            component: () => import('./components/KonDetail.vue')
                        }
                    ]
                },
                {
                    path: 'klasy',
                    component: () => import('./components/KlasyList.vue'),
                    children: [
                        {
                            path: ':id',
                            name: 'klasadetail',
                            props: route => routePropId(route),
                            component: () => import('./components/KlasaDetail.vue')
                        }
                    ]
                },
                {
                    path: 'sedziowie',
                    component: () => import('./components/SedziowieListDetail.vue')
                }
            ]
        }
    ]
});
