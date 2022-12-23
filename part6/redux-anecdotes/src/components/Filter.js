import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    const keyword = e.target.value
    props.setFilter(keyword)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>filter <input type="text" onChange={handleChange} /></div>
  )
}

export default connect(null, { setFilter })(Filter)
