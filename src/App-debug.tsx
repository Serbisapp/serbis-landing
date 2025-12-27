import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from 'react';

const queryClient = new QueryClient();

// Get the base path for GitHub Pages - change 'serbis-landing' to your actual repository name
const basename = import.meta.env.PROD ? '/serbis-landing' : '';

// Debug component to help troubleshoot issues
const Debug = () => {
  useEffect(() => {
    console.log('🐛 Debug Info:');
    console.log('- Environment:', import.meta.env.MODE);
    console.log('- Base path:', basename);
    console.log('- Current URL:', window.location.href);
    console.log('- React app loaded successfully!');
  }, []);

  if (import.meta.env.DEV) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}>
        <div>Mode: {import.meta.env.MODE}</div>
        <div>Base: {basename}</div>
        <div>URL: {window.location.pathname}</div>
      </div>
    );
  }
  return null;
};

const App = () => {
  useEffect(() => {
    // Add global error handler
    const handleError = (event: ErrorEvent) => {
      console.error('🚨 Global Error:', event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Unhandled Promise Rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Debug />
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
