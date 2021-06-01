import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Page404 = () => {
  return (
    <Wrapper>
      <h1>Nothing to see here.</h1>
      <p>Looks like you're trying to access a page that doesn't exist.</p>
      <Link to="/">
        {' '}
        <h1>Go Home</h1>
      </Link>
    </Wrapper>
  )
}

export default Page404
