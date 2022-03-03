import React from "react";
import { useHistory } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";

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
    <nav className="flex items-center justify-between flex-wrap h-32 bg-[#2E4C6D]">
      <div className="mb-2 px-3 sm:mb-0">
        <a href="/">
          <img
            className="sm:object-fill w-52 self-center"
            src="./Geek Hunt-logos_white.png"
            alt=""
          />
        </a>
      </div>
      <div className="absolute inset-y-0 right-0 px-3 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {!user && (
          <>
            <a
              href="/landing"
              className="text-xl px-2 no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Home
            </a>
            <a
              href="/fetchProfiles"
              className="text-xl px-2 no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Profiles
            </a>
            <a
              href="/signin"
              className="text-xl px-2 no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="text-xl px-2 no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Sign Up
            </a>
          </>
        )}
        {user && (
          <div className="px-3">
            {document ? (
              <p
                className="text-xl no-underline
              text-white"
              >
                Hello {document.firstName}!
              </p>
            ) : (
              <p
                className="text-xl no-underline
              text-white"
              >
                Hello!
              </p>
            )}
            <a
              href="/landing"
              className="text-xl px-2 no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Home
            </a>
            <a
              href="/fetchProfiles"
              className="text-xl px-2 no-underline
            text-white hover:text-blue-dark ml-2"
            >
              Profiles
            </a>
            {document && document.isAGeek && (
              <>
                <a
                  href={`/profile/${user.uid}`}
                  className="text-xl px-2 no-underline
                text-white hover:text-blue-dark ml-2"
                >
                  My Profile
                </a>
                <a
                  href="/dashboard"
                  className="text-xl px-2 no-underline
              text-white hover:text-blue-dark ml-2"
                >
                  Dashboard
                </a>
              </>
            )}
            {!isPending && (
              <button
                className="text-xl px-2 no-underline text-white hover:text-blue-dark ml-2"
                onClick={handleLogout}
              >
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
