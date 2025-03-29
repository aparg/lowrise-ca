import { Button } from "../ui/button";
import { Table, TableBody, TableHeader } from "../ui/table";
import { TableRow, TableHead } from "@/components/ui/table";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const RoomInfo = ({ data }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedRooms = showAll ? data : data?.slice(0, 6);

  return (
    data.length > 0 && (
      <div className="mt-8 bg-white rounded-xl border">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Room Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="text-left py-3 pr-6 text-xs font-medium uppercase tracking-wider">
                    Room
                  </th>
                  <th className="text-left py-3 pr-6 text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
                    Size
                  </th>
                  <th className="text-left py-3 pr-6 text-xs font-medium uppercase tracking-wider">
                    Features
                  </th>
                  <th className="text-left py-3 text-xs font-medium uppercase tracking-wider">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {displayedRooms?.map((room) => (
                  <tr
                    key={room.RoomKey}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-6">
                      <div className="font-medium text-sm text-gray-900">
                        {room.RoomType}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 sm:hidden">
                        {room.RoomLength && room.RoomWidth
                          ? `${room.RoomLength} × ${room.RoomWidth} m`
                          : ""}
                      </div>
                    </td>
                    <td className="py-3 pr-6 text-sm text-gray-600 hidden sm:table-cell">
                      {room.RoomLength && room.RoomWidth
                        ? `${room.RoomLength} × ${room.RoomWidth} m`
                        : "-"}
                    </td>
                    <td className="py-3 pr-6">
                      <div className="flex flex-wrap gap-1">
                        {[
                          room.RoomFeature1,
                          room.RoomFeature2,
                          room.RoomFeature3,
                        ]
                          .filter((item) => item)
                          .map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {room.RoomLevel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.length > 6 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All Rooms ({data.length}){" "}
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default RoomInfo;
