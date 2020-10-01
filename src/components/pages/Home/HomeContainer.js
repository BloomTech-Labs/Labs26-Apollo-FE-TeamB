import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  getBearerToken,
  getUserInfo,
  getTopics,
} from '../../../state/actions/apolloActions';
import { useOktaAuth } from '@okta/okta-react';
import { getUserTopics } from '../../../api/index';
import RenderHomePage from './RenderHomePage';

function HomeContainer({
  LoadingComponent,
  getBearerToken,
  getUserInfo,
  getTopics,
  userInfo,
}) {
  const { authState, authService } = useOktaAuth();
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;
    getBearerToken(authState.accessToken);
    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          getUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return getUserInfo({});
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  useEffect(() => {
    getUserTopics(getTopics);
  }, []);
  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderHomePage userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, {
  getBearerToken,
  getUserInfo,
  getTopics,
})(HomeContainer);
