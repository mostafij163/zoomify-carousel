import { images } from './images'
import Carousel from './components/Carousel'

export default function App() {
  return <Carousel slides={images} index={0} />
}
