import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import { config } from '../../../utils/oktaConfig';

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        // there is more we can do to handle some errors here.
      },
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      logo: 'path-to-your-logo',
      // add your custom logo to your signing/register widget here.
      i18n: {
        en: {
          'primaryauth.title': 'Weclome to Apollo!',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '10%',
          height: '100vh',
          backgroundColor: 'indigo',
          color: 'white',
        }}
      >
        <h1 style={{ color: 'white' }}>A</h1>
        <h1 style={{ color: 'white' }}>P</h1>
        <h1 style={{ color: 'white' }}>O</h1>
        <h1 style={{ color: 'white' }}>L</h1>
        <h1 style={{ color: 'white' }}>L</h1>
        <h1 style={{ color: 'white' }}>O</h1>
      </div>
      <div style={{ width: '90%' }}>
        <div id="sign-in-widget" />
      </div>
    </div>
  );
};

export default LoginContainer;
