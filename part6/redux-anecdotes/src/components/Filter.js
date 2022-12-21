import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const keyword = e.target.value
    dispatch(setFilter(keyword))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>filter <input type="text" onChange={handleChange} /></div>
  )
}

export default Filter
