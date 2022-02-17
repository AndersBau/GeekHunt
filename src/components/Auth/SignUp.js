import React, { useState } from "react";
// import { useSignup } from "../../hooks/useSignup";
import GeekForm from "./GeekForm";
import HunterForm from "./HunterForm";
import Navbar from "../UI/Navbar";
import FormInput from "../UI/FormInput";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //displayName is a default value from firebase
  const [displayName, setDisplayName] = useState("");
  const [lastName, setLastName] = useState("");
  //manage the Form for Geek or Hunter
  const [formType, setFormType] = useState("");
  //set type, is a Geek or a Hunter?
  const onFormTypeSelect = (type) => {
    return (e) => {
      e.preventDefault();
      setFormType(type);
    };
  };

  return (
    <div>
      <Navbar />
      <div className="bg-grey flex flex-col space-y-10 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-lg rounded px-12 pt-16 pb-4 mb-4">
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Sign Up
            </div>
            <FormInput
                label="First Name *"
                required
                placeholder="First Name"
                onChange={e => setDisplayName(e.target.value)}
                value={displayName}
            />
            <FormInput
                label="Last Name *"
                required
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <FormInput 
                label="Email *"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="mb-6">
              <label
                className="block text-[#FC997C] font-bold text-base mb-2"
                htmlFor="password"
              >
                Password *
              </label>
              <input
                className="shadow appearance-none border rounded 
                w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
                focus:outline-none focus:shadow-outline"
                v-model="form.password"
                type="password"
                placeholder="Password"
                name="password"
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 rounded text-white inline-block 
                 shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                onClick={onFormTypeSelect("geek")}
              >
                Are you a Geek?
              </button>
              <button
                className="px-4 py-2 rounded text-white inline-block 
                shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                onClick={onFormTypeSelect("hunter")}
              >
                Are you a Hunter?
              </button>
            </div>
            <div>
              {formType === "hunter" && (
                <HunterForm
                  email={email}
                  password={password}
                  displayName={displayName}
                  lastName={lastName}
                />
              )}
              {formType === "geek" && (
                <GeekForm
                  email={email}
                  password={password}
                  displayName={displayName}
                  lastName={lastName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
