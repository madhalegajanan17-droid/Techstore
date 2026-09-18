import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const User = () => {
    const userName = useContext(UserContext);
  return (
    <div>
        <p> Hello {userName}</p>
    </div>
  )
}

export default User