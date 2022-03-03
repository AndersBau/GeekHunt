import React, { useState } from "react";
import { useSignin } from "../../hooks/useSignin";
import Navbar from "../UI/Navbar";
import FormInput from "../UI/FormInput";
import { useHistory } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, error, isPending } = useSignin();
  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault();
    signin(email, password);
    history.push("/");
  };

  return (
    <>
      <div
        className="h-screen bg-grey flex flex-col space-y-10
      justify-center items-center"
      >
        <div className="justify-center w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          >
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Sign In
            </div>
            <FormInput
              label="Email"
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
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full
              py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none
              focus:shadow-outline"
                v-model="form.password"
                type="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex items-center justify-between">
              {!isPending && (
                <input
                  className="px-4 py-2 rounded text-white inline-block
                  shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                  type="submit"
                  value="Sign in"
                />
              )}
              {isPending && (
                <button className="btn" disabled>
                  Loading...
                </button>
              )}

              <p
                className="inline-block align-baseline font-normal
              text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </p>
            </div>
            {error && <p className="error">{error}</p>}
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 Geek Hunt. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
