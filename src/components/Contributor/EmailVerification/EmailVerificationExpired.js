import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../store/App/app-context';
const EmailVerificationExpired = () => {
  const {
    appMode: { isLoggedIn },
  } = useContext(AppContext);

  const history = useHistory();
  return (
    <>
      <h3>Email verification link expired</h3>
      <h4>Looks like the verification link has expired.</h4>

      {!isLoggedIn && (
        <>
          <h4>Please login and verify your email address again</h4>
          <button
            onClick={() => {
              history.replace('/login');
            }}
          >
            Login
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button
            onClick={() => {
              history.replace('/settings/email');
            }}
          >
            Take me to email verification page
          </button>
        </>
      )}
    </>
  );
};

export default EmailVerificationExpired;
