import React from 'react';
// styles
import './Avatar.css'
function Avatar({ src }) {
  return (
    <div className="avatar">
    {src && <img className="w-12 h-12" src={src} alt="" />}
    {!src && <img className="w-12 h-12" src='./default.png' alt="default"/>}
    </div>
  );
}

export default Avatar;
