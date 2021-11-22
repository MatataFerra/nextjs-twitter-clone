import * as React from "react"

function Cross(props) {
  return (
    <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 15.5l-10-10zM15.5 5.5l-10 10" />
      </g>
    </svg>
  )
}

export default Cross
