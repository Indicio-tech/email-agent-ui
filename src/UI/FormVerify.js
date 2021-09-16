import Axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import { useNotification } from './NotificationProvider'
import ReCAPTCHA from 'react-google-recaptcha'

import { Actions, SubmitBtnModal } from './CommonStylesForms'

const CompFormVerify = styled.div`
  box-sizing: border-box;
  padding-top: 30px;
`
const FormWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  background: white;
`

const FormVerify = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const HeaderVerify = styled.div`
  color: ${(props) => props.theme.primary_color};
  border-bottom: 2px solid #ddd;
  margin-bottom: 30px;
  font-size: 1.9em;
  padding-bottom: 3px;
`

export const InputField = styled.input`
  width: stretch;
  height: 1.7em;
  font-size: 1.5em;
  box-sizing: border-box;
  color: ${(props) => props.theme.text_color};
`
const InputBox = styled.div`
  width: 53%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 20px;
`

const Label = styled.label`
  margin-right: 10px;
  font-size: 1.5em;
  line-height: 1.7em;
  color: ${(props) => props.theme.text_color};
`

function FormTestID(props) {
  const credentialForm = useRef(null)
  const [recaptchaKey, setRecaptchaKey] = useState('')
  const [submitEmail, setSubmitEmail] = useState(false)

  const recaptchaRef = React.createRef()
  const setNotification = useNotification()

  useEffect(() => {
    // Fetching the logo
    Axios({
      method: 'GET',
      url: '/api/recaptcha/sitekey',
    }).then((res) => {
      if (res.data.error) {
        setNotification(res.data.error, 'error')
      } else {
        setRecaptchaKey(res.data['key'])
      }
    })
  }, [setNotification])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(credentialForm.current)

    Axios({
      method: 'POST',
      data: {
        email: form.get('email'),
        reCaptcha: recaptchaRef.current.getValue(),
      },
      url: '/api/email/verify',
    }).then((res) => {
      if (res.data.error) {
        setNotification(res.data.error, 'error')
      } else {
        setSubmitEmail(true)
      }
    })
  }

  return (
    <CompFormVerify>
      {!submitEmail ? (
        <FormWrapper>
          <HeaderVerify>
            Please submit your Email Address to be Validated
          </HeaderVerify>
          <FormVerify onSubmit={handleSubmit} ref={credentialForm}>
            <InputBox>
              <Label htmlFor="email">Email</Label>
              <InputField
                type="text"
                name="email"
                id="email"
                placeholder="Example@example.org"
              />
            </InputBox>
            <ReCAPTCHA sitekey={recaptchaKey} ref={recaptchaRef} />
            <Actions>
              <SubmitBtnModal type="submit">Submit</SubmitBtnModal>
            </Actions>
          </FormVerify>
        </FormWrapper>
      ) : (
        <FormWrapper>
          <HeaderVerify>Validation Complete</HeaderVerify>
          <p>Email submitted. Please check your email!</p>
        </FormWrapper>
      )}
    </CompFormVerify>
  )
}

export default FormTestID
