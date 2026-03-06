import Sidebar from '../components/Sidebar'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
function Services(){
    return(
        <main>
            <Sidebar />
            <section className='container'>
                <h1>Servicios</h1>
                <section>
                    <Cards />
                    <Cards />
                    <Cards />
                </section>
                <Footer />
            </section>
        </main>
    )
}
export default Services