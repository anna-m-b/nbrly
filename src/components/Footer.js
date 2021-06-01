import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'

const Container = styled.div`
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  // border: 1px solid red;

  @media screen and (max-width: 760px) {
    font-size: 0.4em;
  }
`

const SocialLinks = styled.div`
  padding: 1em;
`

const SocialIcon = styled.a`
  padding: 2em;
`

const Footer = () => {
  return (
    <Container>
      <SocialLinks>
        <SocialIcon>
          <FacebookIcon />
        </SocialIcon>
        <SocialIcon>
          <TwitterIcon />
        </SocialIcon>
      </SocialLinks>
      <p>Copyright NBRLY 2021</p>
    </Container>
  )
}

export default Footer
