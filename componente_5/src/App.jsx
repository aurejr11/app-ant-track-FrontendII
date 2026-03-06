import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import Cards from './components/Cards.jsx';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Footer />
        
        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px', 
          padding: '0 20px 20px 20px' 
        }}>
          <Cards />
          <Cards />
          <Cards />
        </section>
      </main>
    </div>
  );
}
export default App;
