import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import About from "./components/home/About";
import Mission from "./components/home/Mission";
import WhyChooseUs from "./components/home/WhyChooseUs";
import Services from "./components/home/Services";
import Technology from "./components/home/Technology";
import Process from "./components/home/Process";
import Inquiry from "./components/home/Inquiry";
import Contact from "./components/home/Contact";
import CTA from "./components/home/CTA";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
export default function App() {
  useEffect(() => {
    console.log(
      "%c🚀 Welcome to ALTHEXUS",
      "color:#00BFFF;font-size:22px;font-weight:bold;"
    );
    console.log(
      "%cBuilding Tomorrow's Technology",
      "color:#ffffff;font-size:14px;"
    );
  }, []);

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
      <CTA />
      <Footer />
      <BackToTop />
    </>
  );
}
