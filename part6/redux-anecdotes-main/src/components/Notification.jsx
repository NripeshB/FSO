// const Notification = () => {
//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1,
//     marginBottom: 10
//   }

//   return <div style={style}>render here notification...</div>
// }

// export default Notification

import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
