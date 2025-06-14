import { useState } from "react";

interface Props {
  handleSort: (value: "ascend" | "descend") => void;
};

export function Sort ({ handleSort }: Props) {
  const [sortBgColor, setSortBgColor] = useState<number>(-1);
  const confirmSort = (sort: "ascend" | "descend", index: number) => {
    handleSort(sort);
    setSortBgColor(index);
  };

  return <div className="flex flex-col">
    <p className="font-bold">價格排序</p>
    <div className="flex">
      <button onClick={() => confirmSort("ascend", 0)} 
        className={`text-3xl hover:text-blue-300 ${sortBgColor === 0 ? 'text-blue-300' : ''}`}>▼</button>
      <button onClick={() => confirmSort("descend", 1)} 
        className={`text-3xl hover:text-blue-300 ${sortBgColor === 1 ? 'text-blue-300' : ''}`}>▲</button>
    </div>
  </div>
}