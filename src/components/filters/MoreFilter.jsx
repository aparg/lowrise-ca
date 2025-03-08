import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const MoreFilter = ({
  washroomCountOptions = ["Any", "1+", "2+", "3+", "4+", "5+"],
  additonalFilterChange,
  filterState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreFilterState, setMoreFilterState] = useState({
    hasBasement: filterState.hasBasement || false,
    sepEntrance: filterState.sepEntrance || false,
    washroom: filterState.washroom || "",
  });

  const _handleFilterChange = (name, value) => {
    const newFilterState = {
      ...moreFilterState,
      [name]: value,
    };
    setMoreFilterState(newFilterState);
  };

  const handleClick = (washroom) => {
    _handleFilterChange("washroom", washroom);
  };

  const isActiveWashroom = useCallback(
    (selectedWashroom) => {
      return selectedWashroom === moreFilterState.washroom;
    },
    [moreFilterState.washroom]
  );

  return (
    <div className="mr-4">
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="capitalize px-1 min-w-10 sm:px-3 py-1 text-xs sm:text-sm h-[28px] sm:h-[34px] bg-white rounded-full hover:shadow-md"
        size="sm"
      >
        More Filter
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-6">
          <DialogHeader className="px-0">
            <DialogTitle className="text-[28px] font-medium">
              Filters
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-8">
            <div className="basement__section">
              <h3 className="text-lg font-medium mb-4">Basement</h3>
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={moreFilterState.hasBasement}
                    onCheckedChange={(value) =>
                      _handleFilterChange("hasBasement", value)
                    }
                    className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <label className="text-base font-normal">
                    Finished Basement
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    checked={moreFilterState.sepEntrance}
                    onCheckedChange={(value) =>
                      _handleFilterChange("sepEntrance", value)
                    }
                    className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <label className="text-base font-normal">
                    Separate Entrance
                  </label>
                </div>
              </div>
            </div>

            <div className="washroom__section">
              <h3 className="text-lg font-medium mb-4">Washrooms</h3>
              <div className="flex gap-3 flex-wrap">
                {washroomCountOptions.map((washroom, index) => (
                  <button
                    key={index}
                    className={cn(
                      "min-w-[60px] border rounded-full px-4 py-2 text-base transition-all",
                      "hover:border-black",
                      isActiveWashroom(washroom)
                        ? "bg-black text-white border-black"
                        : "border-gray-200 text-gray-700"
                    )}
                    onClick={() => handleClick(washroom)}
                  >
                    {washroom}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-3 px-0">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 h-12 text-base font-normal rounded-lg border-gray-200"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                additonalFilterChange(moreFilterState);
                setIsOpen(false);
              }}
              className="flex-1 h-12 text-base font-normal rounded-lg bg-black text-white hover:bg-black/90"
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
