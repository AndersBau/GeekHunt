import React, { useState } from "react";
import { useHunterSignup } from "../../hooks/useHunterSignup";
import { signInWithGoogle } from "../../firebase/fbConfig";

function HunterForm({ email, password, displayName, lastName }) {
  const { signup, isPending, error } = useHunterSignup();
  const [PersonalOrCompany, setFormType] = useState("");
  const [location, setLocation] = useState("");

  const onFormTypeSelect = (type) => {
    return (e) => {
      e.preventDefault();
      setFormType(type);
      console.log("seleted");
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, lastName, PersonalOrCompany, location);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white flex flex-col space-y-10 justify-between">
        <div className="bg-white rounded pt-6 pb-8 mb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              className="px-4 py-2 rounded text-white inline-block
            shadow-lg bg-[#396EB0] hover:bg-blue-500 focus:bg-blue-700"
              onClick={onFormTypeSelect("Personal")}
            >
              Personal
            </button>
            <h1 className="text-[#FC997C] font-bold">Or</h1>
            <button
              className="px-4 py-2 rounded text-white inline-block
            shadow-lg bg-[#396EB0] hover:bg-blue-600 focus:bg-blue-700"
              onClick={onFormTypeSelect("Company")}
            >
              Company
            </button>
          </div>
          <div>
            {PersonalOrCompany === "Company" && (
              <>
                <input
                  className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                  type="name"
                  placeholder="Company Name"
                />
                <input
                  className="shadow appearance-none border rounded w-full
                 py-2 px-3 text-gray-700 leading-tight focus:outline-none
                 focus:shadow-outline mb-4"
                  type="name"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  value={location}
                />
              </>
            )}
            {PersonalOrCompany === "Personal" && (
              <input
                className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline mb-4"
                type="name"
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                value={location}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            {!isPending && (
              <input
                className="px-4 py-2 rounded text-white inline-block
               shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
                value="Sign Up"
              />
            )}
            {isPending && (
              <button
                className="px-4 py-2 rounded text-white inline-block
              shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                disabled
              >
                Loading...
              </button>
            )}
            {error && <p>{error}</p>}
            <p
              className="inline-block align-baseline font-normal
            text-sm text-blue-500 hover:text-blue-800"
              // href="#"
              onClick={signInWithGoogle}
            >
              Sign In with Google
            </p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Geek Hunt. All rights reserved.
        </p>
      </div>
    </form>
  );
}

export default HunterForm;
