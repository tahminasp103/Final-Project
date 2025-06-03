import React from 'react';
import Layout from '../../components/common/layout/Layout';
import HeroSection from './sections/heroSection/HeroSection';
import AutoDeclaration from './sections/autoDeclaration/AutoDeclaration';
import Login from '../../components/cards/login/Login';

const Home = () => {
  return (
   <Layout>
    <HeroSection/>
    <AutoDeclaration/>
   </Layout>
  );
}

export default Home;
