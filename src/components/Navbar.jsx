import logo from '../assets/antt.png'

function Navbar() {
  return (
    <header style={{ 
      background: '#333', 
      color: '#fff', 
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img 
        src={logo} 
        alt="Logo App Ant Track" 
        style={{ height: '60px' }} 
      />
      <h1 style={{ marginTop: '0.5rem' }}>App Ant Track</h1>
    </header>
  )
}

export default Navbar