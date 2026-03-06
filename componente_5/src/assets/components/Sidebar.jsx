function Sidebar() {
  return (
    <aside style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center' // ← ¡Aquí estaba el detalle!
    }}>
      <h2 style={{ color: '#4a5568', fontSize: '1rem' }}>COMPONENTE UNO</h2>
    </aside>
  );
}
export default Sidebar;