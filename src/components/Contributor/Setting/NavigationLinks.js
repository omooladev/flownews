const NavigationLinks = () => {
  const links = ["Public profile", "Account", "Appearance", "Notifications"];
  const linksIcon = {};
  return (
    <section>
      <ul>
        {links.map((link) => {
          return (
            <li>
              <NavLink/>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default NavigationLinks;