import loadable from '@loadable/component';

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
