import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import AppHeader from '../UI/AppHeader'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Contact from '../UI/Contact'
import Contacts from '../UI/Contacts'
import Credential from '../UI/Credential'
import Credentials from '../UI/Credentials'
import Home from '../UI/Home'
import User from '../UI/User'
import Users from '../UI/Users'
import Settings from '../UI/Settings'

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`
const Main = styled.main`
  flex: 9;
  padding: 30px;
`

function AdminRoutes(props) {
  const { path } = useRouteMatch()

  return (
    <>
      <Switch>
        <Route exact path={`${path}/forgot-password`}>
          <Redirect to="/admin" />
        </Route>
        <Route exact path={`${path}/password-reset`}>
          <Redirect to="/admin" />
        </Route>
        <Route exact path={`${path}/account-setup`}>
          <Redirect to="/admin" />
        </Route>
        <Route exact path={`${path}/login`}>
          <Redirect to="/admin" />
        </Route>
        <Route
          path="/admin"
          exact
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  logo={props.image}
                  organizationName={props.organizationName}
                  loggedInUsername={props.loggedInUsername}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <Home
                    loggedInUserState={props.loggedInUserState}
                    sendRequest={props.sendMessage}
                    QRCodeURL={props.QRCodeURL}
                  />
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/invitations`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <p>Invitations</p>
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/contacts`}
          exact
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <Contacts
                    loggedInUserState={props.loggedInUserState}
                    history={history}
                    sendRequest={props.sendMessage}
                    contacts={props.contacts}
                    QRCodeURL={props.QRCodeURL}
                  />
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/contacts/:contactId`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <Contact
                    loggedInUserState={props.loggedInUserState}
                    history={history}
                    sendRequest={props.sendMessage}
                    contactId={match.params.contactId}
                    contacts={props.contacts}
                    credentials={props.credentials}
                  />
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/credentials`}
          exact
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <Credentials
                    history={history}
                    credentials={props.credentials}
                  />
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/credentials/:credentialId`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                />
                <Main>
                  <Credential
                    history={history}
                    credential={match.params.credentialId}
                    credentials={props.credentials}
                  />
                </Main>
              </Frame>
            )
          }}
          credentials={props.credentials}
        />
        <Route
          path={`${path}/verification`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <p>Verification</p>
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/messages`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <p>Messages</p>
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/users`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <Users
                    loggedInUserState={props.loggedInUserState}
                    roles={props.roles}
                    users={props.users}
                    user={props.user}
                    successMessage={props.successMessage}
                    errorMessage={props.errorMessage}
                    clearResponseState={props.clearResponseState}
                    sendRequest={props.sendMessage}
                  />
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/users/:userId`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                />
                <Main>
                  <User
                    logo={props.image}
                    organizationName={props.organizationName}
                    history={history}
                  />
                </Main>
              </Frame>
            )
          }}
        />
        <Route
          path={`${path}/settings`}
          render={({ match, history }) => {
            return (
              <Frame id="app-frame">
                <AppHeader
                  loggedInUserState={props.loggedInUserState}
                  loggedInUsername={props.loggedInUsername}
                  logo={props.image}
                  organizationName={props.organizationName}
                  match={match}
                  history={history}
                  handleLogout={props.handleLogout}
                />
                <Main>
                  <Settings
                    updateTheme={props.updateTheme}
                    saveTheme={props.saveTheme}
                    undoStyle={props.undoStyle}
                    errorMessage={props.errorMessage}
                    successMessage={props.successMessage}
                    clearResponseState={props.clearResponseState}
                    imageResponse={props.image}
                    stylesArray={props.stylesArray}
                    addStylesToArray={props.addStylesToArray}
                    removeStylesFromArray={props.removeStylesFromArray}
                    sendRequest={props.sendMessage}
                  />
                </Main>
              </Frame>
            )
          }}
        />
        {/* Redirect to root if no route match is found */}
        <Route render={() => <Redirect to="/admin" />} />
      </Switch>
    </>
  )
}

export default AdminRoutes
