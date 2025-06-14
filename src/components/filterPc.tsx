import { useState } from "react";

interface Props {
  inputMinPrice: number;
  inputMaxPrice: number;
  hasStock: boolean;
  category: string[];
  handleMinPrice: (value: number) => void;
  handleMaxPrice: (value: number) => void;
  handleStockChange: (value: boolean) => void;
  handleCategory: (category: string) => void;
};

export function FilterPc ({inputMinPrice, inputMaxPrice, hasStock, category, handleMinPrice, handleMaxPrice, handleStockChange, handleCategory} : Props) {
  const [showPrice, setShowPrice] = useState<boolean>(true);
  const [showCategory, setShowCategory] = useState<boolean>(true);
  const [showStock, setShowStock] = useState<boolean>(true);

  return <>
  <div className="hidden lg:flex flex-col gap-4">

    {/** 價錢範圍 CheckBox */}
    <div className="flex flex-col gap-2 pb-6 border-b border-b-gray-300">
      <p className="font-bold text-xl flex justify-between cursor-pointer"
        onClick={() => setShowPrice(!showPrice)}>價格區間
        <span>{showPrice ? "▲" : "▼"}</span>
      </p>
      {showPrice && 
        <div className="flex gap-4">
          <label htmlFor="minPrice" className="flex flex-col">
            最低 (NT$)
            <input type="number" id="minPrice" min="0" max="99999" value={inputMinPrice}
              onChange={(event) => handleMinPrice(+ event.target.value)}
              className="border rounded pl-4 w-10 lg:w-auto lg:h-10"/>
          </label>
            <p className="self-center pt-5">—</p>
          <label htmlFor="maxPrice" className="flex flex-col">
            最高 (NT$)
            <input type="number" id="maxPrice" min='1' max="99999" value={inputMaxPrice}
              onChange={(event) => handleMaxPrice(+ event.target.value)}
              className="border rounded pl-4 w-10 lg:w-auto lg:h-10"/>
          </label>
        </div>
      }
    </div>
    {/** 價錢範圍 CheckBox */}
    
    {/** 類別 CheckBox */}
    <div className="flex flex-col gap-2 pb-6 border-b border-b-gray-300">
      <p className="font-bold text-xl flex justify-between cursor-pointer"
        onClick={() => setShowCategory(!showCategory)}>商品分類
        <span>{showCategory ? "▲" : "▼"}</span>
      </p>
      {showCategory && 
        ["A", "B", "C", "D", "E"].map((item, index) => {
        return <div className="flex flex-col" key={index}>
                <label htmlFor={item} className="flex gap-2">
                  <input type="checkbox" checked={category.includes(item)} id={item}
                    onChange={() => handleCategory(item)}>
                  </input>
                  商品{item}
              </label>
          </div>
        })
      }
    </div>
    {/** 類別 CheckBox */}

    {/** 庫存 CheckBox */}
    <div className="flex flex-col gap-2 pb-6 border-b border-b-gray-300">
      <p className="font-bold text-xl flex justify-between cursor-pointer"
        onClick={() => setShowStock(!showStock)}>價格區間
        <span>{showStock ? "▲" : "▼"}</span>
      </p>
      {showStock && 
        <label htmlFor="inStock" className="flex gap-2">
          <input type="checkbox" id="inStock" checked={hasStock} 
            onChange={(event) => handleStockChange(event.target.checked)}
          />
          有庫存
        </label>
      }
    </div>
    {/** 庫存 CheckBox */}
    

  </div>
  </>
}