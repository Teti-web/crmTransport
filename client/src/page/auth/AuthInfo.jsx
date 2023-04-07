import React from 'react'
import { Link } from 'react-router-dom'

const AuthInfo = () => {
  return (
    <div className='authinfo'>
      <button class="fancy">
      <span class="top-key"></span>
        <Link to='/login' class="">Please sign in</Link>
      <span class="bottom-key-1"></span>
     <span class="bottom-key-2"></span>
   </button>
    </div>
  )
}

export default AuthInfo
