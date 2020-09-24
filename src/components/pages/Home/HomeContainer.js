import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  getBearerToken,
  getUsername,
  getTopics,
} from '../../../state/actions/apolloActions';
import { useOktaAuth } from '@okta/okta-react';
import { getUserTopics } from '../../../api/index';
import RenderHomePage from './RenderHomePage';

function HomeContainer({
  LoadingComponent,
  getBearerToken,
  getUsername,
  getTopics,
}) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
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
          setUserInfo(info);
          getUsername(info.name);
          getUserTopics(getTopics);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

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
    bearerToken: state.bearerToken,
  };
};

export default connect(mapStateToProps, {
  getBearerToken,
  getUsername,
  getTopics,
})(HomeContainer);
