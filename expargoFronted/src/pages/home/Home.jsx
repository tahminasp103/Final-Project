import React from 'react';
import Layout from '../../components/common/layout/Layout';
import HeroSection from './sections/heroSection/HeroSection';
import AutoDeclaration from './sections/autoDeclaration/AutoDeclaration';
import CargoService from './sections/cargoService/CargoService';
import ServiceArea from './sections/serviceArea/ServiceArea';
import Shops from './sections/shops/Shops';

const Home = () => {
  return (
   <Layout>
    <HeroSection/>
    <AutoDeclaration/>
    <CargoService/>
    <ServiceArea/>
    <Shops/>
   </Layout>
  );
}

export default Home;
