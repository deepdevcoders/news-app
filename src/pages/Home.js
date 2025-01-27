import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterTabs from "../components/FilterTabs";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { ClipLoader, PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

function Home() {
  const [selectCategory, setSelectCategory] = useState("general");
  const [selectCountry, setSelectCountry] = useState("us");
  const [selectLanguage, setSelectLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchNewsArticles = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setloading(true);
    }
    try {
      const APIKEY = process.env.REACT_APP_NEWS_API_KEY;
      const LATEST_NEWS_BASE_URL =
        "https://api.currentsapi.services/v1/latest-news";
      const SEARCH_NEWS_BASE_URL = "https://api.currentsapi.services/v1/search";

      let url;

      if (searchQuery) {
        url = `${SEARCH_NEWS_BASE_URL}?keywords=${searchQuery}&page_number=${page}&page_size=32&apiKey=${APIKEY}`;
      } else {
        url = `${LATEST_NEWS_BASE_URL}?language=${selectLanguage}&category=${selectCategory}&country=${selectCountry}&page_number=${page}&page_size=32&apiKey=${APIKEY}`;
      }
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        setArticles((prevArticles) =>
          isLoadMore ? [...prevArticles, ...data.news] : data.news
        );
      } else {
        toast.error(data.message || "Failed to fetch articles");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setloading(false);
      }
    }
  };

  const handleCategoryChange = (newCategory) => {
    setSelectCategory(newCategory);
    setSearchQuery("");
    setPage(1); // Reset page to 1 on filter change
  };

  const handleCountryChange = (newCountry) => {
    setSelectCountry(newCountry);
    setSearchQuery("");
    setPage(1); // Reset page to 1 on filter change
  };

  const handleLanguageChange = (newLanguage) => {
    setSelectLanguage(newLanguage);
    setSearchQuery("");
    setPage(1); // Reset page to 1 on filter change
  };

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    setSelectCategory("");
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchNewsArticles(page > 1);
  }, [selectCategory, page, selectCountry, selectLanguage, searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={handleSearch} />
      <FilterTabs
        selectCategory={selectCategory}
        setSelectCategory={handleCategoryChange}
        selectCountry={selectCountry}
        setSelectCountry={handleCountryChange}
        selectLanguage={selectLanguage}
        setSelectLanguage={handleLanguageChange}
      />
      <div className="bg-gray-100 w-full">
        {loading ? (
          <div className="text-center py-6">
            <PulseLoader color="#000" size="20" />
          </div>
        ) : (
          <>
            <Card cardsData={articles} hightLightedText={searchQuery} />
            <div className="text-center py-6">
              {articles?.length < 200 ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 shadow-lg text-sm font-sans ${
                    loadingMore
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                >
                  {loadingMore ? (
                    <ClipLoader color="#fff" size="18" />
                  ) : (
                    "Load More"
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 shadow-lg text-sm font-sans cursor-not-allowed opacity-60"
                >
                  No more Data
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
