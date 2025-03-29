"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 z-[200] bg-white border-b border-gray-100 sticky top-0"
    >
      <div className="px-2 md:px-0 mx-auto">
        <ol className="flex items-center flex-nowrap overflow-x-auto no-scrollbar">
          {items.map((item, index) => (
            <li key={index} className="flex items-center min-w-fit">
              {index === 0 ? (
                // Home icon for first item
                <Link
                  href={item.href || "/"}
                  className="text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center"
                >
                  <Home className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-300 mx-0 md:mx-1 flex-shrink-0" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-xs text-gray-800 hover:text-gray-900 whitespace-nowrap transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-xs font-medium text-gray-900 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
