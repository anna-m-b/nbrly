import React, { useState } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  FormContainer,
  TopContainer,
  FormWrapper,
  Header,
  Banner,
  BottomContainer,
  ImgIcon,
  Button,
  GetStartedDiv,
  LogInButton,
  LoginText,
} from '../../styles/LoginStyles.js'
import { errorToast } from '../ToastNotification'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState({
    email: '',
    password: '',
  })

  const { login } = useAuth()

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      login(fields.email, fields.password)
    } catch (err) {
      console.error(err)
      errorToast('Please check email and password are correct.')
    }
    setLoading(false)
  }

  return (
    <FormContainer>
      <TopContainer>
        <Banner>
          <ImgIcon src="../images/Mess3.png" alt="navbar-logo" />
          <Header>NBRLY</Header>
        </Banner>
        <LoginText>
          Connect with like-minded people in your vicinity for sports, nightlife
          and everything in between
        </LoginText>
      </TopContainer>
      <BottomContainer>
        <GetStartedDiv>
          <Link to="/Signup">
            <Button className="btn-lg btn-block">Get Started</Button>
          </Link>
        </GetStartedDiv>
        <FormWrapper>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={fields.email}
              onChange={handleFieldChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              id="password"
              placeholder="Password"
              name="password"
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            ></Input>
          </FormGroup>

          <LogInButton
            disabled={loading}
            className="btn-sml btn-block"
            onClick={handleLogin}
          >
            Log in
          </LogInButton>
        </FormWrapper>
      </BottomContainer>
    </FormContainer>
  )
}

export default LoginPage
