import React from "react";
import { Categories, Countries, languages } from "./data";

function FilterTabs({
  category,
  setCategory,
  country,
  setCountry,
  language,
  setLanguage,
}) {
  return (
    <>
      <div className="bg-gray-100">
        <div className="w-full max-w-screen-xl mx-auto text-sm font-sans">
          {/* <!-- Categories Start --> */}
          <div className="flex flex-wrap justify-center pt-4 pb-2 space-x-2 border-b border-gray-800">
            {Categories?.map((item, index) => (
              <button
                class={`bg-gray-100 px-6 py-2 text-sm font-semibold hover:border-b-2 hover:border-b-blue-600 rounded ${
                  category === item.value ? "text-blue-600 border-b-2 border-b-blue-600" : "text-gray-700"
                }`}
                type="button"
                key={index}
                value={item.value}
                onClick={() => setCategory(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-4 py-6 px-4 lg:px-2">
            {/* Languages Start */}
            <div className="flex flex-wrap items-center w-full sm:w-auto">
              <label
                htmlFor="languages"
                className="text-sm font-medium text-gray-700 md:mr-2 md:mb-0 mb-1"
              >
                Choose Language:
              </label>
              <select
                id="languages"
                className="w-full sm:w-auto px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages?.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Countries Start */}
            <div className="flex flex-wrap items-center w-full sm:w-auto">
              <label
                htmlFor="countries"
                className="text-sm font-medium text-gray-700 md:mr-2 md:mb-0 mb-1"
              >
                Choose Countries:
              </label>
              <select
                id="countries"
                className="w-full sm:w-auto px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {Countries?.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterTabs;
