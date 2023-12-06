import { FilterFlags } from "@/types/filters";
import Container from "../ui/container";
import FilterIcon from "./filter";

import { MdFilter } from "react-icons/md";
import { useFilterState } from "@/state/editor/filters/filterState";

const FilterDock = () => {
  const selected = useFilterState((state) => state.filter);

  return (
    <Container className="top-2 right-2">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">Filters</h1>
      </div>
      <FilterIcon name="None" filter={FilterFlags.None} icon={MdFilter} />
      <FilterIcon name="All" filter={FilterFlags.All} icon={MdFilter} />
      <FilterIcon name="Wall" filter={FilterFlags.Wall} icon={MdFilter} />
      <FilterIcon name="Door" filter={FilterFlags.Door} icon={MdFilter} />
      <FilterIcon name="Window" filter={FilterFlags.Window} icon={MdFilter} />
      <FilterIcon name="Flooded" filter={FilterFlags.Flooded} icon={MdFilter} />
    </Container>
  );
};

export default FilterDock;
