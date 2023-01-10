import { useContext } from 'react';
import { AppContext } from '../../store/App/app-context';
import { AuthContext } from '../../store/Auth/auth-context';
import Account from './Account';
import styles from './Header.module.css';
import Logo from './Logo';
import Menu from './Menu';
import Navigation from './Navigation';
import ProfileBox from '../Contributor/Dashboard/ProfileBox/ProfileBox';
const Header = () => {
	const { toggleMenu } = useContext(AppContext);
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<header className={`${styles.header} ${toggleMenu ? styles.active : ''}`}>
			<Menu />
			<Logo className={styles.logo} />
			<Navigation className={styles.navigation} />
			{!isLoggedIn && <Account className={styles.account_subscribe} />}
			{isLoggedIn && <ProfileBox />}
			<ProfileBox />
		</header>
	);
};

export default Header;
