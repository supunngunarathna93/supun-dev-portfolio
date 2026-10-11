import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWork from './components/Projects';
import BeforeAfter from './components/BeforeAfter';
import Workflow from './components/Workflow';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <>
      <Preloader />

      {/* Skip to main content — accessibility */}
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <CustomCursor />
      <Navbar />

      <main id="main-content">
        <Hero />

        {/* NLE-inspired section divider */}
        <hr className="section-divider" />

        <SelectedWork />

        <hr className="section-divider" />

        <BeforeAfter />

        <hr className="section-divider" />

        <Workflow />

        <hr className="section-divider" />

        <Services />

        <hr className="section-divider" />

        <About />

        <hr className="section-divider" />

        <Contact />
      </main>
    </>
  );
}
