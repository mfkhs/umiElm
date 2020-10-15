export default [
  { exact: true, path: '/', redirect: '/home' },
  { exact: true, path: '/home', component: '@/pages/home/index' },
  { exact: true, path: '/city/:cityid', component: '@/pages/city/index' },
  { exact: true, path: '/msite', component: '@/pages/msite/index' },
  { exact: true, path: '/food', component: '@/pages/food/index' },
  { exact: true, path: '/search/:geohash', component: '@/pages/search/index' },
  {
    exact: false,
    path: '/shop',
    routes: [
      {
        exact: true,
        path: '/shop/foodDetail',
        component: '@/pages/shop/foodDetail/index',
      },
      { exact: true, path: '/shop', component: '@/pages/shop/index' },
      {
        exact: false,
        path: '/shop/shopDetail',
        routes: [
          {
            exact: true,
            path: '/shop/shopDetail',
            component: '@/pages/shop/shopDetail/index',
          },
          {
            exact: true,
            path: '/shop/shopDetail/shopSafe',
            comments: '@/pages/shop/shopDetail/shopSafe/index',
          },
        ],
      },
    ],
  },
  { exact: true, path: '/login', component: '@/pages/login/index' },
];
