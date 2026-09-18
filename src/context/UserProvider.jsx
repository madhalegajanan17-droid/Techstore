import React from 'react'
import { UserContext } from './UserContext';

const UserProvider = ({children}) => {
    const user = "Harshit";
  return (
    <UserContext.Provider value={user.toUpperCase()}> {children} </UserContext.Provider>
  )
}

export default UserProvider