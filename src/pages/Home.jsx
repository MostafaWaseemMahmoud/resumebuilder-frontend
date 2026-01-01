import React from 'react';
import Banner from '../Components/Home/Banner';
import Hero from '../Components/Home/Hero';
import Features from '../Components/Home/Features';
import Testimonial from '../Components/Home/Testimonial';
import CallToAction from '../Components/Home/CallToAction';
import Footer from '../Components/Home/Footer';
import { Loader } from 'lucide-react';

const Home = ()=> {
  return (
   <div>
  <Banner />
  <Hero />
  <Features></Features>
  <Testimonial></Testimonial>
  <CallToAction></CallToAction>
  <Footer></Footer>
  </div>
  )
}

export default Home;