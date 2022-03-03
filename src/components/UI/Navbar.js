import React from "react";
import { useHistory } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";
import './navbar.css'

function Navbar() {
  const { signout, isPending } = useSignout();
  const { user } = useAuthContext();
  const id = user ? user.uid : undefined;
  // const history = useHistory();
  const { document } = useDocument("users", id);



  function handleLogout() {
    signout();
    // history.push("/signin");
  }


  return (
    <nav>
      <div className="nav_logo-container">
        <a href="/">
          <img
            className="nav_logo"
            src="./Geek Hunt-logos_white.png"
            alt=""
          />
        </a>
      </div>
      <div className="menu">
        <div className="menu-userName">
          {
            document ? (
              <p>Hello {document.firstName}!</p>
              ) : (
              <p>Hello!</p>
              )
          }
        </div>
        {!user && (
          <div className="menu-list">
            <a href="/landing">
              Home
            </a>
            <a href="/fetchProfiles">
              Profiles
            </a>
            <a href="/signin">
              Sign In
            </a>
            <a href="/signup">
              Sign Up
            </a>
          </div>
        )}
        {user && (
          <div className="menu-list">
            <a href="/landing">
              Home
            </a>
            <a href="/fetchProfiles" >
              Profiles
            </a>
            {document && document.isAGeek && (
              <div className="menu-list">
                <a href={`/profile/${user.uid}`} >
                  My Profile
                </a>
                <a href="/dashboard">
                  Dashboard
                </a>
              </div>
            )}
            {!isPending && (
              <button className="" onClick={handleLogout} >
                Sign Out
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
