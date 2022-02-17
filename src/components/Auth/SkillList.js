import React, { useEffect, useState } from "react"

const Skill = ({ query, onClick }) => (
  <li className="inline-block mx-1" onClick={onClick}>
    <span 
      className=" text-sm text-white font-medium py-1 px-2 bg-blue-900 rounded align-middle font-bold uppercase"
    >
      x - {query}
    </span>
  </li>
);

function SkillList({ onChange }) {
  // React Hooks declarations
  const [skills, setSkills] = useState([]);
  const [query, setQuery] = useState("")

  useEffect(() => {
      onChange(skills);
  }, [skills, onChange])

  const handleClick = () => {
    // Add the search term to the list onClick of Search button
    // (Actually searching would require an API call here)

    // Save search term state to React Hooks
    // setSearches(searches => [...searches, query])
    if (query.length > 0) {
        const updated = skills.concat(query)
        setSkills(updated)
    }
  }

  const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value)
  }

  const keyPressed = ({ key }) => {
    // Capture search on Enter key
    if (key === "Enter") {
      handleClick()
    }
  }

  const submitHandler = e => {
    // Prevent form submission on Enter key
    e.preventDefault()
  }

  const removeFormFields = (i) => {
      let newFormValues = [...skills];
      newFormValues.splice(i, 1);
      console.log('remove value',newFormValues)
      setSkills(newFormValues);
      onChange(skills)
    };

  return (
    <div className= "mb-4 form-inline">
        <div>
          <input
            className="shadow appearance-none border rounded
            w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
            placeholder="Skill"
            type="text"
            onChange={updateQuery}
            onKeyPress={keyPressed}
            onSubmit={submitHandler}
          />
          <button
            className="px-4 py-2 my-2 rounded text-white inline-block shadow-lg 
            bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
            type="button"
            onClick={handleClick}
          >
            Add Skill
          </button>
        </div>
        <ul className="bg-white rounded-lg w-full text-gray-900">
        {skills.map((query, index) => (
          <Skill
            onClick={() => removeFormFields(index)}
            query={query}
            // Prevent duplicate keys by appending index:
            key={query + index}
          />
        ))}
      </ul>
    </div>
  )
}

export default SkillList