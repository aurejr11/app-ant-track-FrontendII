import Services from './pages/Services.jsx'
import './App.css'
function App(){

    return(
      <>
 
    <div className="app-container">
      <aside className="sidebar">
        <p>COMPONENTE UNO</p>
      </aside>

      <main className="main-content">
        <section className="banner">
          <p>COMPONENTE DOS</p>
        </section>

        <section className="cards-row">
          <div className="card">
            <div className="card-body">COMPONENTE TRES</div>
            <div className="card-footer">TÍTULO</div>
          </div>
           <div className="card">
            <div className="card-body">COMPONENTE TRES</div>
            <div className="card-footer">TÍTULO</div>
          </div>
           <div className="card">
            <div className="card-body">COMPONENTE TRES</div>
            <div className="card-footer">TÍTULO</div>
          </div>
        </section>
      </main>
    </div>


      </>
    )
}

export default App
