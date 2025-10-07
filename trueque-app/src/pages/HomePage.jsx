import { Footer } from '../components/Footer'
import { Navbarra } from '../components/Navbarra'
import { GaleriaProductos } from '../features/products/GaleriaProductos'

export const HomePage = () => {
  return (
    <>
      <Navbarra />
      <GaleriaProductos />
      <GaleriaProductos />
      <Footer />
    </>
  )
}
