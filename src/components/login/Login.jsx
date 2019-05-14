import React from 'react';
import styled from 'styled-components';
import EmailIconMui from '@material-ui/icons/Email';
import LockIconMui from '@material-ui/icons/Lock';
import NavigateNextIconMui from '@material-ui/icons/NavigateNext';
import { Redirect } from 'react-router-dom';
import CircularProgressMui from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { ApiServer } from '../../settings';
import { withCookies } from 'react-cookie';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const BackContent = styled.div`
  height: 40%;
  width: 100%;
  background-image:
    linear-gradient(to top, rgb(70, 47, 142, 0.95) 65%, rgb(77, 51, 153, 0.85)),
    url('burbles-purple.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LogoWrapper = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0px 0px 6px 0px #7053c6;
  background-size: cover;
  margin-top: 10%;
  @media only screen and (min-width: 768px) { 
    margin-top: 3%;
  }
`;

const TitleWrapper = styled.div`
  margin-top: 5%;
  color: white;
  & > span {
    font-size: 1.35rem;

    font-weight: 400;
    font-family: 'Kodchasan', sans-serif;
  }
  @media only screen and (min-width: 768px) { 
    margin-top: 3%;
    & > span {
      font-size: 1.75rem;
    }
  }
`;

const LoginFormWrapper = styled.div`
  width: 80%;
  min-height: 340px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgb(0, 0, 0, 0.10);
  margin: -56px;
  max-width: 640px;
  @media only screen and (min-width: 768px) { 
    padding: 16px;
  }
`;

const InputWrapper = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & > svg {
    position: absolute;
    left: 8px;
  }
  & > input {
    padding-left: 40px;
  }
`;

const Input = styled.input`
  width: 90%;
  border: none;
  box-shadow: none;
  height: 50px;
  padding: 8px;
  outline: none;
  font-size: 1.0rem;
  border-bottom: solid 0px rgb(96, 64, 191);
  transition: border-bottom 0.1s ease-out;
  &:focus {
    border-bottom: solid 1.5px rgb(96, 64, 191);
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 24px;
  & > svg, div {
    position: absolute;
    right: 24px;
    font-size: 1.45rem;
  }
`;

const Button = styled.button`
  border-radius: 4px;
  box-shadow: 0px 0px 4px 0px #ccc;
  color: white;
  background-image: linear-gradient(to right, #5639ac 0%, #7053c6 100%);
  cursor: pointer;
  width: 90%;
  height: 100%;
  font-size: 1.05rem;
  @media only screen and (min-width: 768px) { 
    width: 100%;
  }
`;

const NavigateNextIcon = styled(NavigateNextIconMui)`
  color: white;
  padding-right: 4px;
`;

const EmailIcon = styled(EmailIconMui)`
  color: rgb(77, 51, 153);
  padding: 4px;
`;

const LockIcon = styled(LockIconMui)`
  color: rgb(77, 51, 153);
  padding: 4px;
`;

const WelcomeBackText = styled.div`
  min-height: 80px; 
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  align-items: center;

  & > span {
    font-family: 'Kaushan Script', cursive;
  }
`;

const ErrorWrapper = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 0.85rem;
    text-align: center;
    color: darkred;
  }
`;

const CircularProgress = styled(CircularProgressMui)`
  color: white !important;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      isLoading: false,
      hasErrors: false,
      errors: [],
      isLoggedIn: false
    }
  }

  handleUserEmail = (e) => {
    this.setState({email: e.target.value});
  }

  handleUserPassword = (e) => {
    this.setState({password: e.target.value});
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { cookies, API } = this.props;
    this.setState({
      isLoading: true
    });
    axios.post(`${ApiServer}/login`, {user: {email: email, password: password} })
    .then(data => {
      if (!!data) {
        const tokenReceived = this.getToken(data.headers['authorization']);
        cookies.set('token', tokenReceived, { path: '/' });
        this.setState({
          isLoading: false,
          hasErrors: false,
          errors: [],
          isLoggedIn: true
        }, () => {
          this.props.handleLogin(true);
        });
      }
    }).catch( (err) => {
      console.log(err);
      this.setState({
        isLoading: false,
        hasErrors: true,
      });
    });
  }

  getToken = (value) => {
    if(value.includes('Bearer')) {
      value = value.split(' ')[1]
    }
    return value;
  }

  loadError = () => {
    this.setState({
      hasErrors: true,
      errors: ['username is incorrect']
    });
  }

  render() {
    const { email, password, rememberMe, hasErrors, errors, isLoggedIn, isLoading } = this.state;

    const ErrorComponent = (
      <ErrorWrapper>
        <span>Email or password are wrong. Please, try again.</span>
        {errors.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </ErrorWrapper>
    );

    console.log(isLoggedIn);

    if (isLoggedIn) return <Redirect to='/orders' />

    return(
      <Wrapper>
        <BackContent>
          <LogoWrapper src="logo_dark_bg.svg" alt="Bit orders management | Bitpharma">
          </LogoWrapper>
          <TitleWrapper>
            <span>Bitpharma | Orders management</span>
          </TitleWrapper>
        </BackContent>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <LoginFormWrapper>
            <WelcomeBackText>
              <span>Welcome back!</span>
            </WelcomeBackText>
            {
              hasErrors? ErrorComponent : null
            }
            <InputWrapper>
              <Input type="email" placeholder="Your email..." value={email} onChange={this.handleUserEmail} id="email" name="email" autoComplete="email" autoFocus />
              <EmailIcon />
            </InputWrapper>
            <InputWrapper>
              <Input type="password" placeholder="Your password..." value={password} onChange={this.handleUserPassword} name="password" id="password" autoComplete="current-password" />
              <LockIcon />
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={this.handleOnSubmit}>LOGIN</Button>
              { isLoading ? <CircularProgress style={{ marginLeft: '7px' }} size={20} color="#fff" /> : <NavigateNextIcon /> }
            </ButtonWrapper>
          </LoginFormWrapper>
        </div>
      </Wrapper>
    );
  }
}

export default withCookies(Login);