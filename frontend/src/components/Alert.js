import React from 'react'

export default function Alert(props) {
  return (
    <div>
        <div className="alert" style={{backgroundColor:"rgba(0,0,0,0.4)"}}>
            {props.message}
        </div>
      
    </div>
  )
}
