import type { Item } from "../types/item";

export function ProductList ({paginationData}: {paginationData: Item[]}) {

  return <div>

  <div className="grid grid-flow-row grid-rows-1">
    <table className="hidden lg:table w-full border border-gray-300 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">商品名稱</th>
          <th className="p-2 border">類別</th>
          <th className="p-2 border">價格</th>
          <th className="p-2 border">有庫存</th>
        </tr>
      </thead>
    {paginationData.map((item, index) => {
      return <tbody key={index}>
        <tr>
          <td className="p-2 border">{item.name}</td>
          <td className="p-2 border">{item.category}</td>
          <td className="p-2 border">{item.price}</td>
          <td className="p-2 border">{item.inStock ? '是' : '否'}</td>
        </tr>
      </tbody>
    })}
    </table>
  </div>
  
  </div>
}