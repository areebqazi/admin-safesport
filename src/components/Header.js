import "./Header.css";
import englishLogo from "../assets/logos/safesportlogo.png";

function Header() {
  return (
    <>
      <header className="header">
        <div className="logo-div">
          <img src={englishLogo} className="logo" alt="Main Logo" />
        </div>
      </header>
      <hr className="border-black" />
    </>
  );
}

export default Header;
