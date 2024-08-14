import dynamic from "next/dynamic";
import { ImSpinner } from "react-icons/im";
import Breadcrumbs from "@/components/Breadcrumbs";

const FiltersWithSalesList = dynamic(
  () => import("@/components/FiltersWithSalesList"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center align-item-center">
        <ImSpinner size={24} />
      </div>
    ),
  }
);

const page = async ({ params }) => {
  const INITIAL_LIMIT = 30;
  const breadcrumbItems = [
    { label: "Lowrise", href: "/" },
    { label: "ON", href: null },
  ];
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="container-fluid">
        <FiltersWithSalesList
          {...{
            INITIAL_LIMIT,
          }}
        />
      </div>
    </>
  );
};

export default page;
