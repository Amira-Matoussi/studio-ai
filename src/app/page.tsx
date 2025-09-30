// components
import { Navbar, Footer } from "@/components";
import ClientLayout from "@/components/client-layout";
import { ChatbotWidget } from "@/components/chatbot-widget";  // 👈 import it here

// sections
import Hero from "./hero";
import OutImpressiveStats from "./out-impressive-stats";
import AboutTeam from "./about-team";
import Services from "./services";
import Testimonial from "./testimonial";
import Contact from "./contact";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <OutImpressiveStats />

      <section id="about">
        <AboutTeam />
      </section>

      <section id="services">
        <Services />
      </section>

      {/* <Testimonial /> */}
      {/* <TrustedCompany /> */}

      <section id="contact">
        <Contact />
      </section>

      <Footer />

      {/* 👇 Floating chatbot always available */}
      <ChatbotWidget />
    </>
  );
}
