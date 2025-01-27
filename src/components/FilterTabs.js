import React, { useEffect, useState } from "react";
import { Categories } from "./data";

function FilterTabs({
  selectCategory,
  setSelectCategory,
  selectCountry,
  setSelectCountry,
  selectLanguage,
  setSelectLanguage,
}) {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    // Fetch all data concurrently
    const fetchData = async () => {
      try {
        const [categoriesRes, countriesRes, languagesRes] = await Promise.all([
          fetch("https://api.currentsapi.services/v1/available/categories"),
          fetch("https://api.currentsapi.services/v1/available/regions"),
          fetch("https://api.currentsapi.services/v1/available/languages"),
        ]);

        const categoriesData = await categoriesRes.json();
        const countriesData = await countriesRes.json();
        const languagesData = await languagesRes.json();

        setCategories(categoriesData.categories || []);
        setCountries(Object.entries(countriesData.regions || {}));
        setLanguages(Object.entries(languagesData.languages || {}));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="w-full max-w-screen-xl mx-auto text-sm font-sans">
          {/* <!-- Categories Start --> */}
          <div className="flex flex-wrap justify-center pt-4 pb-2 space-x-2 border-b border-gray-800">
            {Categories?.map((item, index) => (
              <button
                class={`bg-gray-100 px-6 py-2 text-sm font-semibold hover:border-b-2 hover:border-b-blue-600 rounded ${
                  selectCategory === item.value
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : "text-gray-700"
                }`}
                type="button"
                key={index}
                value={item.value}
                onClick={() => setSelectCategory(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-4 py-6 px-4 lg:px-2">
            {/* Categories INput Field */}
            <label
              htmlFor="categories"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Choose Category:
            </label>
            <select
              id="categories"
              className="w-full sm:w-auto px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 capitalize"
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option disabled className="lowercase">
                --select-any-category
              </option>
              {categories?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>

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
                value={selectLanguage}
                onChange={(e) => setSelectLanguage(e.target.value)}
              >
                <option disabled className="lowercase">
                  --select-any-language
                </option>
                {languages?.map(([label, value], index) => (
                  <option value={value} key={index}>
                    {label}
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
                Choose Country:
              </label>
              <select
                id="countries"
                className="w-full sm:w-auto px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500"
                value={selectCountry}
                onChange={(e) => setSelectCountry(e.target.value)}
              >
                <option disabled className="lowercase">
                  --select-any-country
                </option>
                {countries?.map(([label, value], index) => (
                  <option value={value} key={index}>
                    {label}
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
