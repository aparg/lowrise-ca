"use client";
import formatCurrency from "@/helpers/formatCurrency";
import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";

export default function CompactMortgageCalculator({
  price,
  showDetails = true,
  align = "center",
}) {
  const [intrest, setIntrest] = useState(0);
  const [calculatordata, setCalculatordata] = useState({
    hvalue: price || "",
    dpay: "",
    dper: "20",
    loanamt: "",
    intrate: "4",
    loanterm: "30",
  });
  const [calculated, setCalculated] = useState(null);

  useEffect(() => {
    let val =
      (parseFloat(calculatordata.loanamt) *
        parseFloat(calculatordata.loanterm) *
        parseFloat(calculatordata.intrate)) /
      100;
    setIntrest(val);
  }, [calculatordata.loanamt, calculatordata.loanterm, calculatordata.intrate]);

  useEffect(() => {
    let hvalue = parseFloat(calculatordata.hvalue) || 0;
    let dpay = parseFloat(calculatordata.dpay) || 0;
    let dper = parseFloat(calculatordata.dper) || 0;

    // Update down payment amount if percentage changes
    if (dper !== (dpay / hvalue) * 100) {
      dpay = (dper / 100) * hvalue;
      setCalculatordata((prev) => ({ ...prev, dpay: dpay.toFixed(2) }));
    }

    // Update down payment percentage if amount changes
    if (dpay !== (dper / 100) * hvalue) {
      dper = (dpay / hvalue) * 100;
      setCalculatordata((prev) => ({ ...prev, dper: dper.toFixed(2) }));
    }

    // Calculate loan amount
    let loanamt = hvalue - dpay;
    setCalculatordata((prev) => ({ ...prev, loanamt: loanamt.toFixed(2) }));
  }, [calculatordata.hvalue, calculatordata.dpay, calculatordata.dper]);

  useEffect(() => {
    setCalculated(CalcMonth().toFixed(2));
  }, [calculatordata]);

  function CalcMonth() {
    let i = parseFloat(calculatordata.intrate) / 100;
    let g = i / 12;
    let h = 1 + g;
    let tenn = parseInt(calculatordata.loanterm * 12);
    let powerr = Math.pow(h, tenn);
    let aa = g * powerr;
    let numm = parseFloat(calculatordata.loanamt) * aa;
    let deno = powerr - 1;
    let monthh = numm / deno;
    return monthh;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCalculatordata((prevState) => ({
      ...prevState,
      [id]: value.replace("-", "").replace("$", "").replaceAll(",", ""),
    }));
  };

  const priceNumber = formatCurrency(calculatordata.hvalue).replace("$", "");

  return (
    <div className={`max-w-4xl ${align == "center" ? "mx-auto" : ""}`}>
      <div className="bg-white  ">
        <h2 className="text-3xl font-extrabold text-gray-700 mb-6">
          Mortgage Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Input Fields */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-normal text-gray-500 mb-2 block">
                Sale Price
              </label>
              <input
                type="text"
                id="hvalue"
                value={priceNumber ? `$${priceNumber}` : ""}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-normal focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-normal text-gray-500 mb-2 block">
                Percent Down Payment
              </label>
              <input
                type="text"
                id="dper"
                value={`${calculatordata.dper}`}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-normal focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-normal text-gray-500 mb-2 block">
                Down Payment
              </label>
              <input
                type="text"
                id="dpay"
                value={`$${formatCurrency(calculatordata.dpay).replace(
                  "$",
                  ""
                )}`}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-normal focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-normal text-gray-500 mb-2 block">
                Amortization Period (Years)
              </label>
              <input
                type="text"
                id="loanterm"
                value={calculatordata.loanterm}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-normal focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm font-normal text-gray-500 mb-2 block">
                Interest Rate
              </label>
              <input
                type="text"
                id="intrate"
                value={calculatordata.intrate}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border-0 rounded-lg text-gray-900 text-lg font-normal focus:ring-0"
              />
            </div>
          </div>

          {/* Right Column - Payment Display */}
          <div>
            <h3 className="text-sm font-normal text-gray-500 mb-6">
              Estimated Payment
            </h3>
            <div className="relative">
              <svg width="100%" height="300">
                {(calculatordata.loanamt > 10 || intrest > 10) && (
                  <>
                    <VictoryPie
                      standalone={false}
                      width={300}
                      height={300}
                      data={[
                        {
                          x: "Principal and Interest",
                          y: parseInt(calculatordata.loanamt),
                        },
                        {
                          x: "Property Taxes",
                          y: parseInt(intrest),
                        },
                      ]}
                      innerRadius={85}
                      labelRadius={1}
                      colorScale={["#10B981", "#1F2937"]}
                      style={{
                        labels: { display: "none" },
                        data: {
                          fillOpacity: 0.9,
                          stroke: "#fff",
                          strokeWidth: 2,
                        },
                      }}
                    />
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={150}
                      y={150}
                      style={[
                        { fontSize: 32, fontWeight: "bold" },
                        { fontSize: 16, fill: "#718096" },
                      ]}
                      text={[`$${calculated.toLocaleString()}`, "/ month"]}
                    />
                  </>
                )}
              </svg>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600">
                  $
                  {formatCurrency(
                    calculatordata.loanamt.toLocaleString()
                  ).replace("$", "")}{" "}
                  Principal and Interest
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove or update showDetails section as needed */}
    </div>
  );
}
