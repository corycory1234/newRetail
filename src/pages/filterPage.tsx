import jsonList from "../json/jsonList.json";
import { useState, useEffect, useMemo } from "react";
import type { Item } from "../types/item";
import { Keyword } from "../components/keyword";
import { FilterPc } from "../components/filterPc";
import { ProductList } from "../components/productList";
import { Pagination } from "../components/pagination";
import { Sort } from "../components/sort";
import { Header } from "../components/Header";
import { FilterMobile } from "../components/filterMobile";

export function FilterPage () {
  const [dataList, setDataList] = useState<Item[]>(jsonList);
  const [inputKeyword, setInputKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>("");
  const [hasStock, setHasStock] = useState<boolean>(false);
  const [inputMinPrice, setinputMinPrice] = useState<number>(0);
  const [inputMaxPrice, setinputMaxPrice] = useState<number>(99999);
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

  // Step 1: 建立 category -> items Map
  const categoryMap = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const item of dataList) {
      if(!map.has(item.category)) {
        map.set(item.category, []);
      };
      map.get(item.category)!.push(item);
    };
    return map;
  }, [dataList]);
  
  // Step 2: 快速組出符合類別的資料
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
  
  // 4. 篩選條件後 - 商品Array
  const filteredData = useMemo(() => {
    return categoryFilteredData.filter((item) => {
      const matchStock = hasStock ? item.inStock : true;
      const matchPrice = item.price >= minPrice && item.price <= maxPrice;
      const matchCategory = category.length === 0 || category.includes(item.category);
      
      return matchStock && matchPrice && matchCategory;
    })
  },[categoryFilteredData, hasStock, minPrice, maxPrice, category]);

  // 2. Keyword 搜尋邏輯
  const keywordFilteredData = useMemo(() => {
    // 2.1 禁空白
    if(!keyword || keyword.trim() === "") { return filteredData };
    // 2.2 輸入"item 1" 或 "item1", 都要被撈到
    const cleanKeyword = keyword.toLowerCase().replace(/\s+/g, "").trim();

    return filteredData.filter((item) => {
      // 2.3 JSON數據也支持 "item 1" 或 "item1"
      const cleanName = item.name.toLowerCase().replace(/\s+/g, "").trim();
      return cleanName.includes(cleanKeyword)
    });
  },[filteredData, keyword])

  // 8. 高低價排序
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

  // 5. 總頁數
  const totalPages = Math.ceil(keywordFilteredData.length / itemsPerPage);

  // 6. 分頁渲染 - 20筆/每頁
  const paginationData = useMemo(() => {
    const startIndex = (currentPage -1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);
  
  // 7. 若篩選條件更新, 回到第1頁
  useEffect(() => {
    setCurrentPage(1)
  }, [hasStock, minPrice, maxPrice, category])


  
  

  useEffect(()=> {
    console.log(paginationData);
  },[paginationData]);

  return <div className="container mx-auto">
    {/** Header導覽列 */}
    <div className="flex justify-between items-center">
      <Header></Header>
      <Keyword
        inputKeyword={inputKeyword}
        paginationData={paginationData}
        handleKeyword={setInputKeyword}>
      </Keyword>
    </div>
    {/** Header導覽列 */}

    {/** 篩選 & 商品 */}
    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
      <div className="lg:basis-1/4">
        <FilterMobile
          inputMinPrice={inputMinPrice}
          inputMaxPrice={inputMaxPrice}
          hasStock={hasStock}
          handleMinPrice={setinputMinPrice}
          handleMaxPrice={setinputMaxPrice}
          handleStockChange={setHasStock}
          category={category}
          handleCategory={handleCategory}
          handleSort={setSort}> 
        </FilterMobile>

        <FilterPc
          inputMinPrice={inputMinPrice}
          inputMaxPrice={inputMaxPrice}
          hasStock={hasStock}
          handleMinPrice={setinputMinPrice}
          handleMaxPrice={setinputMaxPrice}
          handleStockChange={setHasStock}
          category={category}
          handleCategory={handleCategory}
          >
        </FilterPc>
      </div>

      <div className="basis-3/4">
        <div className="flex flex-col">
          <div className="hidden lg:flex lg:self-end">
            <Sort
              handleSort={setSort}>
            </Sort>
          </div>
          <ProductList
            paginationData={paginationData}>
          </ProductList>
        </div>
      </div>
    </div>
    {/** 篩選 & 商品 */}
    


    <div className="flex justify-center items-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePage={setCurrentPage}>
      </Pagination>
    </div>
  </div>
}