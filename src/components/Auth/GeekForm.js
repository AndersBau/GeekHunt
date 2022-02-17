import React, { useState } from "react";
import SkillList from "./SkillList";
import { useGeekSignup } from "../../hooks/useGeekSignup";
import FormInput from "../UI/FormInput";
import { signInWithGoogle } from "../../firebase/fbConfig";
//make hook later

function GeekForm({ email, password, displayName, lastName }) {
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureError, setPictureError] = useState(null);
  const [jobTitle, setJobTitle] = useState("");

  const { signup, isPending, error } = useGeekSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(
      email,
      password,
      displayName,
      lastName,
      picture,
      jobTitle,
      description,
      skills,
      linkedInUrl,
      gitHubUrl
    );
  };

  const handleFileChange = (e) => {
    setPicture(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setPictureError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setPictureError("Selected file must be an image");
      return;
    }
    if (selected.size > 3000000) {
      setPictureError("Image file size must be less than 3MB");
      return;
    }

    setPictureError(null);
    setPicture(selected);
    console.log("picture updated");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-grey flex flex-col space-y-10 justify-center items-center">
        <div className="w-full max-w-md">
          <div
            className="bg-white rounded  pt-6 pb-8 mb-4"
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="profile picture"
              >
                Choose your profile picture
              </label>
              <label>
                <input type="file" onChange={handleFileChange} />
                {pictureError && <div className="error">{pictureError}</div>}
              </label>
            </div>
              <FormInput
                label="Job Title *"
                required
                placeholder="JobTitle"
                onChange={e => setJobTitle(e.target.value)}
                value={jobTitle}
              />
            <div className="mb-4">
              <label
                className="block text-[#FC997C] font-bold text-base mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                v-model="form.description"
                type="description"
                autoFocus
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
              <SkillList onChange={(skills) => setSkills(skills)}/>
              <FormInput
                label="LinkedIn Url"
                placeholder="LinkedInUrl"
                onChange={(e) => setLinkedInUrl(e.target.value)}
                value={linkedInUrl}
              />
              <FormInput
                label="GitHub Url"
                placeholder="GitHubUrl"
                onChange={(e) => setGitHubUrl(e.target.value)}
                value={gitHubUrl}
              />
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
                  className="px-4 py-2 rounded text-white inline-block shadow-lg
                  bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                  disabled
                >
                  Loading...
                </button>
              )}
              {error && <p>{error}</p>}
              <p className="text-[#FC997C] font-bold"> required *</p>
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
      </div>
    </form>
  );
}

export default GeekForm;
