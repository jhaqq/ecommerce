import React from "react"
import { IconButton } from "@mui/material"

const Icon = ({ icon, action }) => {

    return (
      <IconButton sx={{ color: 'black' }} onClick={action}>{icon}</IconButton>
    )
}

export default Icon;