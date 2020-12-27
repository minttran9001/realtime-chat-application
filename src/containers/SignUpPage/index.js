import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Input from "../../components/Layout/UI/Input/index";
import Card from "../../components/Layout/UI/Card/index";
import Button from "../../components/Layout/UI/Button/index";
import Title from "../../components/Layout/UI/Title/index";
import {signUp} from '../../actions'
import {useDispatch} from 'react-redux'
export default function SignUp() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName:'',
        lastName:'',
      });
      const handleSignUp = async(e)=>{
        e.preventDefault()
        const user = form
         dispatch(signUp(user))
      }
      return (
        <Layout>
          <Card>
            <form onSubmit={handleSignUp} className="authForm">
              <Title>SIGN UP</Title>
              <Input
                type="text"
                label="First name"
                placeholder=""
                onChange={(value) => setForm({...form,firstName: value })}
              />
              <Input
                type="text"
                label="Last name"
                placeholder=""
                onChange={(value) => setForm({...form,lastName: value })}
              />
              <Input
                type="email"
                label="Email"
                placeholder=""
                onChange={(value) => setForm({...form,email: value })}
              />
              <Input
                type="password"
                label="Password"
                placeholder=""
                onChange={(value) => setForm({...form,password: value })}
              />
              <Button type='submit'>SIGN UP</Button>
            </form>
          </Card>
        </Layout>
      )
}
