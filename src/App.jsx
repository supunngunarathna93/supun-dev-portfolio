import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Preloader from './components/Preloader';

// Show preloader only once per session (reads flag BEFORE setting it)
function computeShowPreloader() {
  try {
    if (sessionStorage.getItem('preloader-shown')) return false;
    // Don't set the flag here — Preloader.jsx sets it on mount
    return true;
  } catch {
    return true;
  }
}

export default function App() {
  // Evaluated once at mount time
  const [showPreloader]  = useState(() => computeShowPreloader());
  const [preloaderDone, setPreloaderDone] = useState(() => !computeShowPreloader());

  return (
    <>
      {showPreloader && (
        <Preloader onDone={() => setPreloaderDone(true)} />
      )}
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero showPhoto={preloaderDone} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

