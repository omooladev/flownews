import { useHistory } from "react-router-dom";

const EmailVerificationExpired = () => {
  const history = useHistory();
  return (
    <>
      <h3>Email verification link expired</h3>
      <h4>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </h4>
      <h4>Please login and verify your email address again</h4>
      <button
        onClick={() => {
          history.replace("/login");
        }}
      >
        Login
      </button>
    </>
  );
};

export default EmailVerificationExpired;
