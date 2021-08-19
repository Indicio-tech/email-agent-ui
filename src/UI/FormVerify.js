import Axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'

import { useNotification } from './NotificationProvider'
import ReCAPTCHA from "react-google-recaptcha";

import {
  StyledPopup,
  InputBox,
  Modal,
  ModalHeader,
  ModalContentWrapper,
  ModalContent,
  CloseBtn,
  Actions,
  CancelBtn,
  SubmitBtnModal,
  ModalLabel,
  InputFieldModal,
  TextItem,
} from './CommonStylesForms'



function FormTestID(props) {
  const credentialForm = useRef(null)
  const [recaptchaKey, setRecaptchaKey] = useState("")
  const [submitEmail, setSubmitEmail] = useState(false)

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
        console.log(res.data)
        setRecaptchaKey(res.data['key'])
      }
    })
  }, [setNotification])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(credentialForm.current)

    let attributes = {}

    attributes = [
      {
        name: 'mpid',
        value: form.get('mpid') || '',
      },
      {
        name: 'patient_local_id',
        value: form.get('patient_local_id') || '',
      },
    ]

    
    
    setSubmitEmail(true);
  }


  return (
    <div>
      {!submitEmail ? (
      <div> 
        <p>Please submit your email address to be valdated</p> 
        <form onSubmit={handleSubmit} ref={credentialForm}>
          <InputBox>
            <ModalLabel htmlFor="email">Email</ModalLabel>
              <InputFieldModal
                type="text"
              name="email"
              id="email"
              placeholder="example@example.org"
            />
          </InputBox>
          <ReCAPTCHA
            sitekey={recaptchaKey}
          />,
          <Actions>
            <SubmitBtnModal type="submit">Submit</SubmitBtnModal>
          </Actions>
        </form>
      </div>
      ) : (
      <div>
        <p>Email submitted. Please check your email!</p>
      </div>)}
    </div>
  )
}

export default FormTestID
