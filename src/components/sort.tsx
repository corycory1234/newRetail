interface Props {
  handleSort: (value: "ascend" | "descend") => void;
};

export function Sort ({ handleSort }: Props) {
  return <div className="flex flex-col">
    <p className="font-bold">價格排序</p>
    <div className="flex">
      <button onClick={() => handleSort("ascend")} 
        className="text-3xl hover:text-blue-300 focus:text-blue-300">▼</button>
      <button onClick={() => handleSort("descend")} 
        className="text-3xl hover:text-blue-300 focus:text-blue-300">▲</button>
    </div>
  </div>
}