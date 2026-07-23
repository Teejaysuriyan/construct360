import AuthLayout from './components/AuthLayout';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        overflowX: 'auto',
      }}
    >
      <AuthLayout />
    </div>
  );
}

export default App;
