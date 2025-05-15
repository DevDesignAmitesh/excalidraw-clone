import Collaborating from "@/components/Collaborating";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyFeatures from "@/components/KeyFeatures";
import Testimonials from "@/components/Testimonials";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen relative pb-5">
      <Hero />
      <KeyFeatures />
      <HowItWorks />
      <Testimonials />
      <Collaborating />
      <Footer />
    </div>
  );
};

export default page;
