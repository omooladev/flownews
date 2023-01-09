import React from 'react';
import styles from './ProfileBox.module.css';

const ProfileBox = () => {
	return (
		<details className={styles.details}>
			<summary>Click me</summary>
			<nav className={`${styles['nav-user']}`}>
				<ul className={`${styles['nav-user-list']}`}>
					<li>Profile</li>
					<li>Lists</li>
					<li>Stories</li>
					<li>Stats</li>
				</ul>
				<hr />
				<ul className={`${styles['nav-user-list']}`}>
					<li>Settings</li>
					<li>Refine recommendations</li>
					<li>Manage publications</li>
				</ul>
				<hr />
				<ul className={`${styles['nav-user-list']}`}>
					<li>Become a member</li>
					<li>Apply to the partner program</li>
					<li>Gift a membership</li>
				</ul>
			</nav>
		</details>
	);
};

export default ProfileBox;
