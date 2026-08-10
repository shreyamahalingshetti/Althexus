import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import About from "../components/About";
import Mission from "../components/Mission";
import WhyChooseUs from "../components/WhyChooseUs";
import Services from "../components/Services";
import Technology from "../components/Technology";
import Process from "../components/Process";
import Inquiry from "../components/Inquiry";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Mission />
      <WhyChooseUs />
      <Services />
      <Technology />
      <Process />
      <Inquiry />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}