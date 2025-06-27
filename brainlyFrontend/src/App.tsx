import "./App.css"
import { Button } from './components/Button'
import { PlusIcon } from './components/icons/plusIcon'

const App = () => {
  return (
    <div>
      <Button startIcon={<PlusIcon/>} varient = 'primary' text = 'share1' size = "sm"></Button>
      <Button startIcon={<PlusIcon/>} varient = 'secondary' text = 'share2' size = "md"></Button>
      <Button startIcon={<PlusIcon/>} varient = 'secondary' text = 'share2' size = "lg"></Button>
    </div>
  )
}

export default App
