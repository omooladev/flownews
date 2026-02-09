import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../store/App/app-context';
const EmailVerifiedAlready = () => {
  const {
    appMode: { isLoggedIn },
  } = useContext(AppContext);

  const history = useHistory();
  return (
    <>
      <h3>Your Email Address has been verified already</h3>
      <h4>Your request to verify your email was unsuccessful because it has already been verified</h4>
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

export default EmailVerifiedAlready;
