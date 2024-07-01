import "./Header.css";
import englishLogo from "../assets/logos/safesportlogo.png";
import axios from "axios";
import { API } from "../constants";

function Header() {
  const user = localStorage.getItem("user");
  const handleSignOut = async () => {
    try {
      await axios.post(`${API}/auth/signout`);
      localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header className="header">
        <div className="logo-div">
          <img src={englishLogo} className="logo" alt="Main Logo" />
          <div className="lang-button-div">
            {user ? (
              <button
                className="mobile-btn-lang"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : null}
          </div>
        </div>
      </header>
      <hr className="border-black" />
    </>
  );
}

export default Header;
