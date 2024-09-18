"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";

const Gallery = ({ data }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <>
      {LightGallery ? (
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-rows-3 sm:grid-rows-2 grid-cols-4 gap-2"
        >
          <>
            {data?.length > 0 ? (
              data.map((url, index) => (
                <Link
                  href={`${url}`}
                  key={index}
                  className={`gallery-item overflow-hidden rounded-[10px] ${
                    index === 0
                      ? "row-span-2 col-span-4 sm:col-span-2 h-[240px] sm:h-[520px]"
                      : "h-[100px] sm:h-[255px]"
                  } ${index >= 5 ? "hidden" : ""}`}
                >
                  <Image
                    loader={() => url}
                    src={url}
                    width={500}
                    height={index === 0 ? 800 : 207}
                    className={`w-full h-full ${
                      index === 0 ? "" : ""
                    } object-cover object-center transform duration-200 hover:scale-110`}
                    alt={`Image ${index + 1}`}
                  />
                </Link>
              ))
            ) : (
              <p>NO Image</p>
            )}
          </>
        </LightGallery>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Gallery;
