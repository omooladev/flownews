import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import styles from './AccountSubscribe.module.css';
import { AppContext } from '../../../../store/App/app-context';
const Account = (props) => {
  let className = props.className || '';
  const {
    componentsIsActive: { accountSubscribeContainerIsActive },
    onToggleComponentsIsActive,
  } = useContext(AppContext);
  const history = useHistory();

  const showOpenAccountContainer = useCallback(() => {
    onToggleComponentsIsActive({ type: 'accountSubscribeContainer', event: 'toggle' });
  }, [onToggleComponentsIsActive]);
  const hideOpenAccountContainer = useCallback(() => {
    onToggleComponentsIsActive({ type: 'accountSubscribeContainer', event: 'close' });
  }, [onToggleComponentsIsActive]);
  const toggleAccountContainer = useCallback(
    (event) => {
      onToggleComponentsIsActive({ type: 'accountSubscribeContainer', event: 'toggle' });
    },
    [onToggleComponentsIsActive],
  );
  const loginHandler = useCallback(
    (event) => {
      history.replace('/login');
    },
    [history],
  );
  const becomeContributorHandler = useCallback(
    (event) => {
      history.replace('/become-contributor');
    },
    [history],
  );

  return (
    <div className={`${className} ${styles.account_subscribe} ${accountSubscribeContainerIsActive ? styles.active : ''}`}>
      <div className={styles.my_account} onClick={toggleAccountContainer}>
        <div onMouseEnter={showOpenAccountContainer}>
          <FaRegUser className={styles.icon} />
          <span>my account</span>
        </div>
        <div className={styles['my_account_container']} onMouseLeave={hideOpenAccountContainer}>
          <span>Get into your account</span>
          <hr />
          <div className={styles['my_account_container_button']}>
            <button className={styles.login} onClick={loginHandler}>
              Login
            </button>
            <button className={styles.contributor} onClick={becomeContributorHandler}>
              Become a contributor
            </button>
          </div>
        </div>
      </div>
      <button type="button" className={styles.subscribe_button}>
        subscribe
      </button>
    </div>
  );
};
export default React.memo(Account);
