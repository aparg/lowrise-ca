import { useCallback, useState } from "react";

export const PriceRangeFilterBottom = ({
  name,
  value,
  handleFilterChange,
  minMaxPrice,
}) => {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });

  const [defaultPrice, setDefaultPrice] = useState({
    min: minMaxPrice.min,
    max: minMaxPrice.max,
  });

  const [unMount, setUnMount] = useState(false);

  const convertIntoCurrency = useCallback(
    (price) => {
      return Number(price).toLocaleString("en-US", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
      });
    },
    [price]
  );

  const handleRangeChange = ([min, max]) => {
    const newPrice = { min, max };
    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  useEffect(() => {
    const newPrice = {
      min: value?.min > 0 ? value?.min : minMaxPrice.min,
      max: value?.max > 0 ? value?.max : minMaxPrice.max,
    };

    const newDefaultPrice = {
      min: minMaxPrice.min,
      max: minMaxPrice.max,
    };
    setDefaultPrice(newDefaultPrice);
    setPrice(newPrice);

    if (value.min === 0 && value.max === 0) {
      setUnMount(true);
      setTimeout(() => {
        setUnMount(false);
      }, [10]);
    }
  }, [value, minMaxPrice]);

  return (
    <>
      <div className="w-full fixed bottom-0 border-t-2 left-0 px-4 py-4 bg-white">
        {!unMount && (
          <Slider
            step={50}
            label=""
            color="foreground"
            minValue={defaultPrice.min}
            maxValue={defaultPrice.max}
            showTooltip={true}
            // value={[price.min, price.max]}
            onChangeEnd={handleRangeChange}
            defaultValue={[defaultPrice.min, defaultPrice.max]}
            formatOptions={{ style: "currency", currency: "USD" }}
            classNames={{
              base: "max-w-md slider gap-3",
              track: "bg-gray-100 border border-secondary",
              filler: "bg-black bg-gradient-to-r",
              value: "font-bold fs-6 text-white",
            }}
            renderThumb={(props) => {
              return (
                <div
                  {...props}
                  className="bg-black group p-1 top-1/2 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="bg-black shadow rounded-full w-3 h-3 block" />
                  {!props["data-pressed"] && (
                    <>
                      {props.index === 0 ? (
                        <span
                          style={{
                            position: "absolute",
                            top: -32,
                            left: -10,
                            fontSize: "11px",
                            color: "white",
                          }}
                          className="bg-black custom-range-thumb p-1 border-md"
                        >
                          {convertIntoCurrency(price.min)}
                        </span>
                      ) : null}
                      {props.index === 1 ? (
                        <span
                          style={{
                            position: "absolute",
                            top: -32,
                            left: -30,
                            fontSize: "11px",
                            color: "white",
                          }}
                          className="bg-black  custom-range-thumb p-1 border-md"
                        >
                          {convertIntoCurrency(price.max)}
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
              );
            }}
            tooltipProps={{
              offset: 10,
              placement: "bottom",
              classNames: {
                base: [
                  // arrow color
                  "custom-range-thumb",
                ],
                content: [
                  "py-2 shadow-xl",
                  "text-white bg-[#217955] custom-range-thumb rounded-circle",
                ],
              },
            }}
          />
        )}
      </div>
    </>
  );
};
