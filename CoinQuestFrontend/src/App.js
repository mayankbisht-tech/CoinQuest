import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AuctionSection from './components/AuctionSection';
import HowItWorksSection from './components/HowItWorksSection';
import ProtectionSection from './components/ProtectionSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import VotingPage from './components/VotingPage';
import { AuthProvider } from './context/AuthContext'; 

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const App = () => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'how-it-works', 'auction', 'themes', 'protect', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const MainLayout = () => (
    <>
      <HeroSection scrollToSection={scrollToSection} />
      <AuctionSection />
      <HowItWorksSection />
      <ProtectionSection />
      <NewsletterSection email={email} setEmail={setEmail} />
      <Footer scrollToSection={scrollToSection} />
    </>
  );

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          activeSection={activeSection} 
          scrollToSection={scrollToSection} 
        />
        
        <Routes>
          <Route path="/" element={<MainLayout />} />

          <Route 
            path="/signin" 
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } 
          />

          <Route 
            path="/vote" 
            element={
              <ProtectedRoute>
                <VotingPage />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;