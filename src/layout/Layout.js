import Header from "../components/Header/Header";
import Error from "./Error";
import Loader from "./Loader";
import Main from "./Main";
const Layout = () => {
  return (
    <>
      <Header />
      <Main />
      <Error />
      <Loader />
    </>
  );
};

export default Layout;
