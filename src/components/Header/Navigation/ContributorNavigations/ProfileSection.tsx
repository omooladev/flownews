import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../../store/App/app-context';
import { AuthContext } from '../../../../store/Auth/auth-context';
import ProfileBox from '../../../../UI/ProfileBox';
import Write from './Write';
import styles from './ProfileSection.module.css';

const ProfileSection = () => {
  const history = useHistory();
  //----------> access the application context and extract
  //            the following properties
  const {
    componentsIsActive: { profileBoxIsActive },
    onToggleComponentsIsActive,
  } = useContext(AppContext);
  //----------> access the authentication context and extract
  //            the following properties
  const {
    onSignOut,
    contributorData: { username, username: contributorFullUsername, email: contributorEmailAddress },
    searchedContributorData,
    onResetSearchedContributor,
    newStory: { storyId },
  } = useContext(AuthContext);

  const goToPage = useCallback(
    (pageUri) => {
      //---------->This function is responsible for pushing users
      //           to a profile section page when the page link is clicked

      //----------> reset searched contributor if it exists
      if (searchedContributorData.username) {
        onResetSearchedContributor();
      }

      //----------> automatically close the profile section when a page link is clicked
      onToggleComponentsIsActive({ type: 'profileBox', event: 'close' });

      //----------> push to the new page
      history.push(pageUri);
    },
    [history, onToggleComponentsIsActive, searchedContributorData, onResetSearchedContributor],
  );

  const toggleProfileBoxHandler = useCallback(() => {
    //----------> a function that toggles the display of the profile section UI
    onToggleComponentsIsActive({ type: 'profileBox', event: 'toggle' });
  }, [onToggleComponentsIsActive]);
  return (
    <section className={styles.profile_section}>
      <ProfileBox className="Header__ProfileBox" onClick={toggleProfileBoxHandler} options={{ showIcon: true }} />
      {profileBoxIsActive && (
        <nav className={`${styles['nav-user']}`}>
          <ul className={`${styles['nav-user-list']}`}>
            <p className={styles.signed_in_as}>Signed in as</p>
            <label className={styles.username}>{contributorFullUsername}</label>
          </ul>
          <hr />
          {!history.location.pathname.startsWith('/new-story') && !history.location.pathname.startsWith(`/story/${storyId}/edit`) && (
            <>
              <ul className={`${styles['nav-user-list']}`}>
                <Write className={styles.write} />
              </ul>
              <hr className={styles.write_line} />
            </>
          )}

          <ul className={`${styles['nav-user-list']}`}>
            <li onClick={() => goToPage(`/@${username}`)}>Profile</li>
            <li>Lists</li>
            <li>Stories</li>
            <li>Stats</li>
          </ul>
          <hr />
          <ul className={`${styles['nav-user-list']}`}>
            <li onClick={() => goToPage('/settings/profile')}>Settings</li>
            <li>Manage publications</li>
          </ul>
          <hr />
          <ul className={`${styles['nav-user-list']}`}>
            <li>Become a member</li>
          </ul>
          <hr />
          <ul className={`${styles['nav-user-list']}`}>
            <li onClick={onSignOut} className={styles.sign_out}>
              Sign out
            </li>
            <label onClick={onSignOut} className={styles.email}>
              {contributorEmailAddress}
            </label>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default ProfileSection;
