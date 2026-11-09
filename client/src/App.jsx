import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initGlobalButtonSoundListener } from './utils/soundEffects';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import LandingPage from './pages/LandingPage';
import TemplateGallery from './pages/TemplateGallery';
import TemplatePreview from './pages/TemplatePreview';
import Editor from './pages/Editor';
import Dashboard from './pages/Dashboard';
import PublicPortfolio from './pages/PublicPortfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import ResumeBuilder from './pages/ResumeBuilder';
import ResumeTemplatesPage from './pages/ResumeTemplatesPage';
import AnimatedBackground from './components/common/AnimatedBackground';
import BackgroundSwitcher from './components/common/BackgroundSwitcher';
import MobileDesktopBanner from './components/common/MobileDesktopBanner';

// Protected Route Guard for dashboard and settings
function ProtectedRoute({ children }) {
  // User login barrier removed as requested — direct instant access for creators
  return children;
}

// Layout wrapper to include Navbar and Footer conditionally
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isFullScreenRoute = 
    location.pathname.startsWith('/editor') || 
    location.pathname.startsWith('/templates/preview') ||
    location.pathname.startsWith('/resume-builder') ||
    location.pathname.startsWith('/p/');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Mobile user alert to switch to Desktop site for optimal 3D creation */}
      <MobileDesktopBanner />

      {/* 5-Style Interactive Canvas Background that reacts to mouse & scroll on standard pages */}
      {!isFullScreenRoute && <AnimatedBackground />}

      {/* Floating Background Switcher Pill on standard pages */}
      {!isFullScreenRoute && <BackgroundSwitcher />}

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {!isFullScreenRoute && <Navbar />}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        {!isFullScreenRoute && <Footer />}
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    return initGlobalButtonSoundListener();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            {/* Main Page is Dashboard as requested, with direct logo transfer */}
            <Route path="/" element={<Dashboard />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/templates" element={<TemplateGallery />} />
            <Route path="/resume-templates" element={<ResumeTemplatesPage />} />
            <Route path="/templates/preview/:templateId" element={<TemplatePreview />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/editor" 
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/editor/:id" 
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resume-builder" 
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resume-builder/:templateId" 
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Public Portfolio (No authentication required) */}
            <Route path="/p/:slug" element={<PublicPortfolio />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}
