// import { images } from './images'
import Carousel from './components/Carousel'
import { response } from './data/gallery-files'

export default function App() {
  return <Carousel images={response.data} index={0} />
}
