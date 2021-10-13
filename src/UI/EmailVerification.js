import Axios from 'axios'
import React, { useRef, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

import styled from 'styled-components'

import { useNotification } from './NotificationProvider'
import { handleImageSrc } from './util'

import QRCode from 'qrcode.react'

import { FormContainer, LogoHolder, Logo, QRHolder } from './CommonStylesForms'

const QR = styled(QRCode)`
  display: block;
  margin: auto;
  padding: 10px;
  width: 300px;
`
function AccountSetup(props) {
  const token = window.location.hash.substring(1)
  const [QRCodeURL, setQRCodeURL] = useState(false)

  const [id, setId] = useState({})

  useEffect(() => {
    // Kick the user off this page if trying to access without a token
    if (!token) {
      console.log('No token')
      return
    }

    const decoded = jwt_decode(token)
    // Check if the token is expired
    if (Date.now() >= decoded.exp * 1000) {
      console.log('The link has expired')
      setNotification("The user doesn't exist or the link has expired", 'error')
      props.history.push('/login')
    } else {
      console.log('The token is valid')
      setId(decoded.id)
    }

    // Check the token on the back end
    Axios({
      method: 'POST',
      data: {
        token: token,
      },
      url: '/api/email/invite',
    }).then((res) => {
      if (res.data.error) {
        setNotification(res.data.error, 'error')
        props.history.push('/login')
      } else {
        setQRCodeURL(res.data.invitation_url)
      }
    })
  }, [])

  const [logo, setLogo] = useState(null)

  useEffect(() => {
    // Fetch the logo
    Axios({
      method: 'GET',
      url: '/api/logo',
    }).then((res) => {
      if (res.data.error) {
        setNotification(res.data.error, 'error')
      } else {
        setLogo(handleImageSrc(res.data[0].image.data))
      }
    })
  }, [])

  // Access the notification context
  const setNotification = useNotification()

  return (
    <FormContainer>
      <LogoHolder>
        {logo ? <Logo src={logo} alt="Logo" /> : <Logo />}
      </LogoHolder>
      <p>Scan the QR code to get your email credential!</p>
      <QRHolder>
        {QRCodeURL ? (
          <QR value={QRCodeURL} size={256} renderAs="svg" />
        ) : (
          <p>Loading...</p>
        )}
      </QRHolder>
    </FormContainer>
  )
}

export default AccountSetup
