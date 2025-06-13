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

export function FilterBar ({inputMinPrice, inputMaxPrice, hasStock, category, handleMinPrice, handleMaxPrice, handleStockChange, handleCategory} : Props) {
  // console.log(category);
  const [showPrice, setShowPrice] = useState<boolean>(false);

  return <>
  <div className="flex flex-col gap-2 border">
    
    {/** 價錢範圍 CheckBox */}
    <p className="font-bold text-xl flex justify-between cursor-pointer"
      onClick={() => setShowPrice(!showPrice)}>價格區間
      <span>{showPrice ? "▲" : "▼"}</span>
    </p>
    {showPrice && 
      <div className="flex justify-between">
        <label htmlFor="minPrice" className="flex flex-col">
          最低
          <input type="number" id="minPrice" min="0" max="99999" value={inputMinPrice}
            onChange={(event) => handleMinPrice(+ event.target.value)}
            className="border rounded w-10 lg:w-36"/>
        </label>
          
        <label htmlFor="maxPrice" className="flex flex-col">
          最高
          <input type="number" id="maxPrice" min='1' max="99999" value={inputMaxPrice}
            onChange={(event) => handleMaxPrice(+ event.target.value)}
            className="border rounded w-10 lg:w-36"/>
        </label>
      </div>
    }
    {/** 價錢範圍 CheckBox */}
    
    {/** 類別 CheckBox */}
    {["A", "B", "C", "D", "E"].map((item, index) => {
      return <label htmlFor={item} key={index}>
        類別{item}
        <input type="checkbox" checked={category.includes(item)} id={item}
          onChange={() => handleCategory(item)}>

        </input>
      </label>
    })}
    {/** 類別 CheckBox */}

    {/** 庫存 CheckBox */}
    <label htmlFor="inStock">
      <input type="checkbox" id="inStock" checked={hasStock} 
        onChange={(event) => handleStockChange(event.target.checked)}
      />
      有庫存
    </label>
    {/** 庫存 CheckBox */}


  </div>
  </>
}