import React, { ElementType, use, useEffect, useState } from "react";

import SelectableIcon from "@/components/ui/selectableIcon";
import { FilterFlags } from "@/types/filters";
import { useFilterState } from "@/state/editor/filters/filterState";

interface FilterIconProps {
  icon: ElementType;
  name: string;
  filter: FilterFlags;
}

const FilterIcon = (props: FilterIconProps) => {
  const selected =
    props.filter === FilterFlags.None &&
    useFilterState.getState().filter === FilterFlags.None
      ? true
      : props.filter === FilterFlags.All
      ? useFilterState.getState().filter === FilterFlags.All
      : (useFilterState.getState().filter & props.filter) > 0;

  const onSelect = () => {
    useFilterState.getState().setFilter(props.filter);
  };

  return (
    <SelectableIcon
      icon={props.icon}
      name={props.name}
      onSelect={onSelect}
      selected={selected}
    />
  );
};

export default FilterIcon;
