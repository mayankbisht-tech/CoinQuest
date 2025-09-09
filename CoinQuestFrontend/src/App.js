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

// Import the route protection components we created earlier
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const App = () => { // Renamed to App for standard practice, but CoinQuestWebsite is fine too.
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

  // Your MainLayout for the homepage is preserved
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
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeSection={activeSection} scrollToSection={scrollToSection} />
        
        {/* --- ROUTING LOGIC IS UPDATED HERE --- */}
        <Routes>
          {/* Your main website layout is the default route */}
          <Route path="/" element={<MainLayout />} />

          {/* Sign-in and Sign-up are wrapped in PublicRoute */}
          {/* This prevents logged-in users from seeing them */}
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

          {/* The voting page is wrapped in ProtectedRoute */}
          {/* This requires users to be logged in to access it */}
          <Route 
            path="/vote" 
            element={
              <ProtectedRoute>
                <VotingPage />
              </ProtectedRoute>
            } 
          />

          {/* Add a fallback to redirect any unknown URLs to the homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;