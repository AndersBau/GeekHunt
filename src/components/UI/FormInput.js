import React from "react";

function FormInput({ label, onChange, value, placeholder, required }) {
  return (
    <div className="mb-4">

      <label
        className="block text-[#FC997C] font-bold text-base mb-2"
        htmlFor="description"
        >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded
        w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
        focus:outline-none focus:shadow-outline"
        autoFocus
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        />
    </div>
  );
}

export default FormInput;
