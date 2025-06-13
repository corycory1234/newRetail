import type { Item } from "../types/item";
interface Props {
  inputKeyword: string;
  paginationData: Item[]
  handleKeyword: (value: string) => void;
}
export function Keyword ({inputKeyword, paginationData, handleKeyword}: Props) {

  return <div className="relative">
  <input type="text"
    placeholder="請輸入搜尋商品名稱"
    value={inputKeyword}
    onChange={(event) => handleKeyword(event.target.value)}
    className="w-auto px-4 lg:px-10 py-2 bg-gray-200 rounded-full">
  </input>
  <div className="absolute top-2 right-5">
    <SearchSvg></SearchSvg>
  </div>
  {/* <ul>
    {paginationData.map((item, index) => {
      return <li key={index}>
        {item.name}
      </li>
    })}
  </ul> */}
  
  </div>
};

// 放大鏡SVG
const SearchSvg = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
}