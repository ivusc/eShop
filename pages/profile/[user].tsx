import { NextPage } from 'next'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Profile : NextPage = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div>Profile page coming soon!</div>
  )
}

export default Profile