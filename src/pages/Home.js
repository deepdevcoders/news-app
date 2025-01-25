import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterTabs from "../components/FilterTabs";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { ClipLoader, PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

function Home() {
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("us");
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setloading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const filteredData = articles.filter((data) => data.url && data.urlToImage);

  const APIKEY = process.env.REACT_APP_NEWS_API_KEYY;

  const fetchNewsArticles = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setloading(true);
    }
    try {
      let url;

      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&page=${page}&pageSize=100&apiKey=${APIKEY}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&language=${language}&page=${page}&pageSize=20&apiKey=${APIKEY}`;
      }
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        setArticles((prevArticles) =>
          isLoadMore ? [...prevArticles, ...data.articles] : data.articles
        );
        setTotalResults(data.totalResults);
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
    setCategory(newCategory);
    setSearchQuery("");
    setPage(1); // Reset page to 1 on filter change
  };

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    setSearchQuery("");
    setPage(1); // Reset page to 1 on filter change
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setSearchQuery("");
    setPage(1); // Reset page to 1 on filter change
  };

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    setCategory("");
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchNewsArticles(page > 1);
  }, [category, page, country, language, searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={handleSearch} />
      <FilterTabs
        category={category}
        setCategory={handleCategoryChange}
        country={country}
        setCountry={handleCountryChange}
        language={language}
        setLanguage={handleLanguageChange}
      />
      <div className="bg-gray-100 w-full">
        {loading ? (
          <div className="text-center py-6">
            <PulseLoader color="#000" size="20" />
          </div>
        ) : (
          <>
            <Card cardsData={filteredData} />
            <div className="text-center py-6">
              {articles.length < totalResults ? (
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
