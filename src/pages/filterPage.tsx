import jsonList from "../json/jsonList.json";
import { useState, useEffect, useMemo } from "react";
import type { Item } from "../types/item";
import { Keyword } from "../components/keyword";
import { FilterPc } from "../components/filterPc";
import { ProductList } from "../components/productList";
import { Pagination } from "../components/pagination";
import { Sort } from "../components/sort";
import { Header } from "../components/header";
import { FilterMobile } from "../components/filterMobile";

export function FilterPage () {
  const [dataList, setDataList] = useState<Item[]>(jsonList);
  const [inputKeyword, setInputKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>("");
  const [hasStock, setHasStock] = useState<boolean>(false);
  const [inputMinPrice, setInputMinPrice] = useState<number>(0);
  const [inputMaxPrice, setInputMaxPrice] = useState<number>(99999);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(99999);
  const [category, setCategory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;
  const [sort, setSort] = useState<"ascend" | "descend" | "none">("none");

  // 1. Debounce 防抖, 300毫秒再觸發Keyword
  useEffect(() => {
    const timerId = setTimeout(() => {
      setKeyword(inputKeyword.toLowerCase());
    }, 300);
    return () => clearTimeout(timerId);
  }, [inputKeyword]);

  // 2. Debounce 防抖, 500毫秒再更新$$範圍
  useEffect(() => {
    const timerId = setTimeout(() => {
      setMinPrice(inputMinPrice);
    }, 500);
    return () => clearTimeout(timerId);
  },[inputMinPrice]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setMaxPrice(inputMaxPrice);
    }, 500);
    return () => clearTimeout(timerId);
  },[inputMaxPrice]);

  // 3. 類別切換 (多選checkBox)
  const handleCategory = (category: string) => {
    setCategory((prev) => {
      return prev.includes(category) ? prev.filter((item) => item !== category) // 取消checkBox
      : [...prev, category]
    })
  };

  // 4.1 因應 category 分類, 使用Map物件, 減少時間複雜度, 不然1萬筆資料用filter跑, 太過於線性
  const categoryMap = useMemo(() => {
    const map = new Map<string, Item[]>(); // 4.2 泛型 <這是 key型別, 這是 value型別>
    for (const item of dataList) {
      if(!map.has(item.category)) {
        map.set(item.category, []);
      };
      map.get(item.category)!.push(item); // 4.3 "!" 這邊是非空斷言, 代表TS肯定這裡不會是undefined或null
    };
    return map;
  }, [dataList]);
  
  // 4.4 categoryMap 已經組好 5組(A~E)哈希表, 這邊 categoryFilteredData 就直接去拿對應的哈希表, 
  // 不要用filter去遍歷1萬次, 才撈會打勾的類別
  const categoryFilteredData = useMemo(() => {
    if(category.length === 0) { return dataList };
    const combined: Item[] = [];
    for(const item of category) {
      const group = categoryMap.get(item);
      if (group) {
        combined.push(...group)
      }
    };
    return combined
  }, [category, categoryMap, dataList]);
  
  // 5. 篩選條件後 - 商品Array
  const filteredData = useMemo(() => {
    return categoryFilteredData.filter((item) => {
      const matchStock = hasStock ? item.inStock : true;
      const matchPrice = item.price >= minPrice && item.price <= maxPrice;
      const matchCategory = category.length === 0 || category.includes(item.category);
      
      return matchStock && matchPrice && matchCategory;
    })
  },[categoryFilteredData, hasStock, minPrice, maxPrice, category]);

  // 6. Keyword 搜尋邏輯
  const keywordFilteredData = useMemo(() => {
    // 6.1 禁空白
    if(!keyword || keyword.trim() === "") { return filteredData };
    // 6.2 輸入"item 1" 或 "item1", 都要被撈到
    const cleanKeyword = keyword.toLowerCase().replace(/\s+/g, "").trim();

    return filteredData.filter((item) => {
      // 6.3 JSON數據也支持 "item 1" 或 "item1"
      const cleanName = item.name.toLowerCase().replace(/\s+/g, "").trim();
      return cleanName.includes(cleanKeyword)
    });
  },[filteredData, keyword])

  // 7. 高低價排序
  const sortedData = useMemo(() => {
    const copy = [...keywordFilteredData];
    if(sort === "ascend") {
      return copy.sort((a, b) => a.price - b.price);
    }
    else if(sort === "descend") {
      return copy.sort((a, b) => b.price - a.price);
    }
    else {
      return copy;
    }
  },[keywordFilteredData, sort])

  // 8. 總頁數
  const totalPages = Math.ceil(keywordFilteredData.length / itemsPerPage);

  // 9. 分頁渲染 - 20筆/每頁
  const paginationData = useMemo(() => {
    const startIndex = (currentPage -1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);
  
  // 10. 若篩選條件更新, 回到第1頁
  useEffect(() => {
    setCurrentPage(1)
  }, [hasStock, minPrice, maxPrice, category])

  // useEffect(()=> {
  //   console.log(paginationData);
  //   console.log(keywordFilteredData, "被篩選後幾筆");
  // },[paginationData, keywordFilteredData]);

  return <div className="container mx-auto pb-2 flex flex-col gap-4">
    {/** Header導覽列 */}
    <div className="flex justify-between items-center bg-white fixed z-10 container pl-0 pr-7 py-2">
      <Header></Header>
      <Keyword
        inputKeyword={inputKeyword}
        paginationData={paginationData}
        handleKeyword={setInputKeyword}>
      </Keyword>
    </div>
    {/** Header導覽列 */}

    {/** 篩選 & 商品 */}
    <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mt-[57.06px] lg:mt-[104px]">
      <div className="lg:basis-1/4">
        <FilterMobile
          inputMinPrice={inputMinPrice}
          inputMaxPrice={inputMaxPrice}
          hasStock={hasStock}
          handleMinPrice={setInputMinPrice}
          handleMaxPrice={setInputMaxPrice}
          handleStockChange={setHasStock}
          category={category}
          handleCategory={handleCategory}
          handleSort={setSort}
          keywordFilteredData={keywordFilteredData}> 
        </FilterMobile>

        <FilterPc
          inputMinPrice={inputMinPrice}
          inputMaxPrice={inputMaxPrice}
          hasStock={hasStock}
          handleMinPrice={setInputMinPrice}
          handleMaxPrice={setInputMaxPrice}
          handleStockChange={setHasStock}
          category={category}
          handleCategory={handleCategory}
          >
        </FilterPc>
      </div>

      <div className="basis-3/4">
        <div className="flex flex-col">
            <Sort
              handleSort={setSort}
              keywordFilteredData={keywordFilteredData}>
            </Sort>
          <ProductList
            paginationData={paginationData}
            inputKeyword={inputKeyword}>
          </ProductList>
        </div>
      </div>
    </div>
    {/** 篩選 & 商品 */}
    
    {/** 分頁 */}
    <div className="flex justify-center items-center">
      <div className="lg:basis-1/4"></div>
      <div className="lg:basis-3/4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePage={setCurrentPage}
          paginationData={paginationData}>
        </Pagination>
      </div>
    </div>
    {/** 分頁 */}

  </div>
}