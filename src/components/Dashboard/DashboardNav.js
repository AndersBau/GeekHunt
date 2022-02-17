import React from 'react';
function DashboardNav() {
  return (<div className="flex justify-between bg-slate-100 flex-wrap">
    <h1 className="font-extrabold text-6xl text-slate-400 items-center m-3">Main Working Space</h1>
    <div className="search-bar flex items-center justify-center">
      {/* <div className="flex border-2 rounded-full mr-4">
        <input type="text" className="px-4 py-2 w-80 rounded-full" placeholder="Search..." />
        <button className="flex items-center justify-center px-4 border-l">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </div> */}
    </div>
  </div>);
}

export default DashboardNav;
