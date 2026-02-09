import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../store/App/app-context';
const EmailVerified = () => {
  const {
    appMode: { isLoggedIn },
  } = useContext(AppContext);

  const history = useHistory();
  return (
    <>
      <h3>You're all set</h3>
      <h4>Thanks for confirming your email address</h4>
      {!isLoggedIn && (
        <>
          <h4>Please login to continue</h4>
          <button
            onClick={() => {
              history.replace('/login');
            }}
          >
            Login
          </button>
        </>
      )}
    </>
  );
};

export default EmailVerified;
