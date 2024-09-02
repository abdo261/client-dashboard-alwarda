
import { useParams } from 'react-router-dom'

const Show = () => {
  const {id}=useParams()
  return (
    <div>Show payment {id}</div>
  )
}

export default Show