import React from "react";

function Card({ cardsData, hightLightedText }) {

  const highlightText = (text) => {
    if (!hightLightedText) return text;
    const regex = new RegExp(`(${hightLightedText})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="w-full max-w-screen-xl mx-auto text-sm font-sans">
          {cardsData?.length === 0 ? (
            <div className="text-center py-6">
              <p className="font-semibold text-base font-sans opacity-60">
                No more Data
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-start md:pt-4 pb-10">
              {cardsData?.map((data, index) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  key={index}
                >
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <a
                      href={data.url}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <img
                        src={data.image}
                        alt={data.title || "Image"}
                        className="w-full h-48 object-cover"
                      />
                    </a>
                    <div className="p-4">
                      <a
                        className="font-semibold text-lg mb-2 hover:underline cursor-pointer"
                        href={data.url}
                        target="_blank"
                      >
                        {highlightText(data.title || "No Title")}
                      </a>
                      <p className="text-sm text-gray-600 mb-2">
                        {highlightText(data.description || "No Description")}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>By {data.author || "No Author"}</span>
                        <span>
                          {new Date(data.published).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
