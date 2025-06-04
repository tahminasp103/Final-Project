import React from 'react';
import Layout from '../../components/common/layout/Layout';
import HeroSection from './sections/heroSection/HeroSection';
import AutoDeclaration from './sections/autoDeclaration/AutoDeclaration';

const Home = () => {
  return (
   <Layout>
    <HeroSection/>
    <AutoDeclaration/>
   </Layout>
  );
}

export default Home;
