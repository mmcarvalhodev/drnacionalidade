import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Requisitos from "@/components/Requisitos";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Requisitos />
      <HowItWorks />
      <About />
      <Testimonials />
      <Faq />
      <BlogPreview />
      <Contact />
    </>
  );
}
