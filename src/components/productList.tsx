import type { Item } from "../types/item";

export function ProductList ({paginationData}: {paginationData: Item[]}) {

  return <>

  <ul>
    {paginationData.map((item, index) => {
      return <li key={index}>
          {item.name} - ${item.price}
        </li>
    })}
  </ul>
  
  </>
}