import React, { useState } from 'react'

const UseGrid = () => {
    const [rowcol, setrowcol] = useState(false)

    const handleGrid = () => {
        setrowcol((prev) => !prev)
    }
  return {
    rowcol, handleGrid
  }
}

export default UseGrid
