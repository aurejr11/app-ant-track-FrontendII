function Cards() {
  return (
    <article style={{
      border: '1px solid #ddd',
      borderRadius: '15px',
      overflow: 'hidden',
      width: '100%',
      backgroundColor: 'white'
    }}>
      <section style={{ backgroundColor: '#e9ecef', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontWeight: 'bold' }}>COMPONENTE TRES</p>
      </section>
      <section style={{ padding: '15px', textAlign: 'center', borderTop: '1px solid #ddd' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', letterSpacing: '2px' }}>TÍTULO</h3>
      </section>
    </article>
  );
}
export default Cards;