/* eslint-disable react/jsx-filename-extension */

import React from 'react'

const strokeStyle = {
  vectorEffect: 'non-scaling-stroke'
}

const PublishIcon = () => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    width="1em"
    height="1em"
  >
    <path d="M4.99997 5.50005H20" stroke="currentColor" style={strokeStyle} />
    <path d="M12.5 9.00003V20" stroke="currentColor" style={strokeStyle} />
    <path d="M7.5 14L12.5 9.00003L17.5 14" stroke="currentColor" style={strokeStyle} />
  </svg>
)

export default PublishIcon