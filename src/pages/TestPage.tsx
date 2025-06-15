import { useState, useEffect } from 'react';

const TestPage = () => {
  const [mounted, setMounted] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    mode: '',
    base: '',
    url: '',
    timestamp: ''
  });

  useEffect(() => {
    setMounted(true);
    setDebugInfo({
      mode: import.meta.env.MODE,
      base: import.meta.env.BASE_URL,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Test page mounted successfully!');
    console.log('Environment:', import.meta.env.MODE);
    console.log('Base URL:', import.meta.env.BASE_URL);
    console.log('Current URL:', window.location.href);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '500px',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textAlign: 'center' as const
    },
    subtitle: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      textAlign: 'center' as const,
      opacity: 0.9
    },
    debugSection: {
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      fontSize: '0.9rem',
      fontFamily: 'monospace'
    },
    debugItem: {
      marginBottom: '8px',
      wordBreak: 'break-all' as const
    },
    status: {
      display: 'inline-block',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      background: mounted ? '#10b981' : '#f59e0b',
      color: 'white',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Serbis Landing</h1>
        <p style={styles.subtitle}>
          GitHub Pages Configuration Test
        </p>
        
        <div style={styles.status}>
          {mounted ? '✅ React App Loaded' : '⏳ Loading...'}
        </div>

        <div style={styles.debugSection}>
          <h3 style={{ marginBottom: '15px', fontSize: '1rem' }}>🔍 Debug Information</h3>
          <div style={styles.debugItem}>
            <strong>Mode:</strong> {debugInfo.mode || 'Loading...'}
          </div>
          <div style={styles.debugItem}>
            <strong>Base URL:</strong> {debugInfo.base || 'Loading...'}
          </div>
          <div style={styles.debugItem}>
            <strong>Current URL:</strong> {debugInfo.url || 'Loading...'}
          </div>
          <div style={styles.debugItem}>
            <strong>Loaded at:</strong> {debugInfo.timestamp || 'Loading...'}
          </div>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            If you can see this page, your React app is working! 
            <br />
            Check the browser console for additional debug information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
