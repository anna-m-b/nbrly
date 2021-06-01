import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  margin: 5px 15px 5px 3px;
`

const Input = styled.input`
  margin: 5px;
  justify-self: start;
  align-self: center;
`

const CheckBox = ({ name, defaultChecked = false, onChange }) => {
  return (
    <>
      <Input
        id={name}
        type="checkbox"
        name={name}
        default
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <Label htmlFor={name}>{name}</Label>
    </>
  )
}

export default CheckBox
