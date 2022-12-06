import { useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  // visible & hide
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
