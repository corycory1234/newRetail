import type { Item } from "../types/item";
interface Props {
  inputKeyword: string;
  paginationData: Item[]
  handleKeyword: (value: string) => void;
}
export function Keyword ({inputKeyword, paginationData, handleKeyword}: Props) {

  return <>
  <input type="text"
    placeholder="請輸入搜尋商品名稱"
    value={inputKeyword}
    onChange={(event) => handleKeyword(event.target.value)}
    className="p-2">
  </input>
  {/* <ul>
    {paginationData.map((item, index) => {
      return <li key={index}>
        {item.name}
      </li>
    })}
  </ul> */}
  </>
}