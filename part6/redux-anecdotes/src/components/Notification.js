import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={props.message !== '' ? style : { dispaly: 'none' }}>
      {props.message}
    </div>
  )
}

const mapPropsToState = (state) => {
  return {
    message: state.message
  }
}

export default connect(mapPropsToState)(Notification)