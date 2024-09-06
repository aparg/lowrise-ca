import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2 z-[999] bg-white">
      <div>
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-black hover:text-primary-green"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-500 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
