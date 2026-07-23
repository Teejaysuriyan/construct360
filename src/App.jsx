import AuthLayout from './components/AuthLayout';

function App() {
  return (
    <div
      style={{
        height: '100%',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
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
