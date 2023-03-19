import React, { useState } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import Button from '../components/Button'
import Loader from '../components/Loader'
import useAuth from '../hooks/useAuth'
import GlobalStyles from '../assets/styles/GlobalStyles'

const StyledLogin = styled.main`
  min-height: 100vh;
  padding: 1rem;
  display: grid;
  place-items: center;

  .container{
    width: min(20rem, 100%);
  }

  .copyright{
    text-align: center;
    font-weight: bold;
  }

  .box{
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border: 1px solid var(--clr-primary-100);
  }

  .logo{
    margin-inline: auto;
  }

  .error{
    color: red;
    font-weight: bold;
  }
`

const LoginPage = () => {

  const [form, setForm] = useState({ username: "", password: "" })

  const { login, isLoading, isError, isLoggedIn } = useAuth()

  if (isLoggedIn()) {
    navigate('/')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }


  const formIsValid = form.username !== "" && form.password !== ""

  return (
    <StyledLogin dir='rtl'>
      <GlobalStyles />
      {isLoading &&
        <Loader />
      }
      <div className='container'>
        <div className='box grid'>
          <div className='logo'>logo</div>
          <form className='grid'>
            {isError &&
              <small className="error">اسم المستخدم او كلمة المرور غير صحيحة</small>
            }

            <div>
              <div className="form-group">
                <label htmlFor="username">
                  اسم المستخدم:
                </label>
                <input id="username" name="username" required onChange={handleChange} value={form.username} />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  كلمة المرور:
                </label>
                <input type="password" id="password" name="password" required onChange={handleChange} value={form.password} />
              </div>
            </div>

            <Button onClick={() => login(form)} disabled={!formIsValid || isLoading}>دخول</Button>
          </form>
        </div>

        <div className="copyright">
          <small>جميع الحقوق محفوظة 2022 - 2023 &copy;</small>
        </div>
      </div>
    </StyledLogin >
  )
}

export default LoginPage