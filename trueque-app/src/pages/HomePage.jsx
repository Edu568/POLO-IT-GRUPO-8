import { Footer } from '../components/Footer'
import { Navbarra } from '../components/Navbarra'
import { GaleriaProductos } from '../features/products/GaleriaProductos'

export const HomePage = ({searchItems}) => {

  const searchEvents = (search) => {
    console.log("Buscando en HomePage:", search);
  }

  return (
    <>
      <Navbarra />
      <GaleriaProductos />
      <Footer />
    </>
  )
}
