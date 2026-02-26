import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App(){
  return(
    <div style={{
      display:"flex",
      flexDirection:"column",
      minHeight:"100vh"
    }}>
      <Navbar />
      <main style={{
        flex:"1",
        padding:"2rem",
      }}>
        <h2>Ant Track</h2>
      </main>
      <Footer />
    </div>
  )
}
export default App