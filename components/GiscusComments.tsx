"use client";

import { useState } from "react";
import Giscus from "@giscus/react";

export function GiscusComments() {
  const [visible, setVisible] = useState(false);

  return (
    <section className="max-w-3xl mx-auto my-12">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Discussion
          </h3>
          <button
            onClick={() => setVisible((v) => !v)}
            className="px-3 py-1.5 text-sm rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow hover:shadow-sm active:scale-[.98]"
          >
            {visible ? (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Hide
              </span>
            ) : (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Show
              </span>
            )}
          </button>
        </div>

        {visible && (
          <div className="mt-4 animate-fadeIn">
            <Giscus
              id="comments"
              repo="thaunghtike-share/giscus-by-tho"
              repoId="R_kgDOPJedIg"
              category="General"
              categoryId="DIC_kwDOPJedIs4CssKY"
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="light_tritanopia"
              lang="en"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}