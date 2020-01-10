import loadable from '@loadable/component';

// TODO: Use '../../data/views-schema/routes', and create dynamic routes.
// i.e. loadable(() => import(`../views/${route.componentName}`))
// Unfortunately, webpack/babel is not working correctly, and causing problems with test files.

const AboutUs = loadable(() => import('../views/about-us'));
const ContactUs = loadable(() => import('../views/contact-us'));
const Home = loadable(() => import('../views/home'));

const routes = [
  {
    component: AboutUs,
    exact: true,
    path: '/about-us',
  },
  {
    component: ContactUs,
    exact: true,
    path: '/contact-us',
  },
  {
    component: Home,
    exact: true,
    path: '/',
  },
];

export default routes;
