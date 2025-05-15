import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen relative pb-20">
      <Hero />
      <KeyFeatures />
    </div>
  );
};

export default page;
