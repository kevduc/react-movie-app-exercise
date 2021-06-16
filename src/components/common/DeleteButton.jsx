import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes as cross } from '@fortawesome/free-solid-svg-icons'

const DeleteButton = ({ className, onClick }) => {
  return (
    <button onClick={onClick} type="button" className={`btn btn-danger ${className}`}>
      <FontAwesomeIcon icon={cross} />
    </button>
  )
}

export default DeleteButton
