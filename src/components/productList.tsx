import type { Item } from "../types/item";

export function ProductList ({paginationData}: {paginationData: Item[]}) {

  return <>
    {/** 表格Layout - PC */}
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
          <tr className={`${item.inStock === false ? ['bg-gray-200 opacity-50'] : ''}`}>
            <td className="p-2 border">{item.name}</td>
            <td className="p-2 border">{item.category}</td>
            <td className="p-2 border">{item.price}</td>
            <td className={`p-2 border 
              ${item.inStock === false ? 'text-red-500' : ''}`}>
              {item.inStock ? '是' : '否'}
            </td>
          </tr>
        </tbody>
      })}
      </table>
    </div>
    {/** 表格Layout - PC */}

    {/** 卡片Layout - 手機 */}
    <div className="lg:hidden grid grid-flow-row grid-cols-2 gap-2 justify-items-center">
      {paginationData.map((item, index) => {
        return <div key={index} className={`w-full flex flex-col gap-2 border rounded shadow-sm p-2
        ${item.inStock === false ? ['bg-gray-300 opacity-50'] : ''}`}>
          <div className="flex">
            <p className="font-bold text-nowrap truncate">商品名稱：</p>
            <span className="text-nowrap">{item.name}</span>
          </div>
          <div className="flex">
            <p className="font-bold">類別：</p>
            <span>{item.category}</span>
          </div>
          <div className="flex">
            <p className="font-bold">價格：</p>
            <span>${item.price}</span>
          </div>
          <div className="flex">
            <p className="font-bold">庫存：</p>
            <span className={`${item.inStock === false ? 'text-red-600' : ''}`}>
              {item.inStock ? '有' : '無'}
            </span>
          </div>
        </div>
      })}
    </div>
    {/** 卡片Layout - 手機 */}
  
  </>
}