import { useMemo } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  handlePage: (page: number) => void;
};

export function Pagination ({ currentPage, totalPages, handlePage} : Props) {
  // 1. 每次最多5張分頁
  const maxVisible = 5;
  // 2. 每往下點1頁, 就+1頁, 如:2~11 >> 3~12頁 >> 4~13頁... (動態生成頁碼)
  const visiblePages = useMemo(() => {
    let start = currentPage;
    if(start + maxVisible - 1 > totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1);
    };
    return Array.from({length: Math.min(maxVisible, totalPages - start + 1)}, 
    (_, index) => start + index);
  }, [currentPage, totalPages])


  return <div className="flex flex-col items-center gap-2">
  <div className="flex justify-center items-center">
      {/** 第1頁 */}
      <button 
        disabled={currentPage === 1} 
        onClick={() => handlePage(1)}
        className={`border rounded cursor-pointer px-1 lg:py-2 lg:px-4
        ${currentPage > 1 ? 'hover:bg-blue-300' : ''}
        `}
        >
        |＜
      </button>
      {/** 第1頁 */}

      {/** 上一頁 */}
      <button disabled={currentPage === 1} 
        onClick={() => handlePage(currentPage -1)}
        className={`border rounded cursor-pointer px-1 lg:py-2 lg:px-4
        ${currentPage > 1 ? 'hover:bg-blue-300' : ''}
        `}
        >
        ＜
      </button>
      {/** 上一頁 */}


      {/** 分頁 - 20筆數據/每頁 */}
      {visiblePages.map((page) => {
        return <button
          key={page}
          onClick={() => handlePage(page)}
          className={`border rounded cursor-pointer hover:bg-blue-300 px-2 lg:py-2 lg:px-4
            ${currentPage === page ? 'bg-blue-300' : ''}`
          }>
          {page}
        </button>
      })}
      {/** 分頁 - 20筆數據/每頁 */}

      {/** 下一頁 */}
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => handlePage(currentPage +1)}
        className={`border rounded cursor-pointer px-1 lg:py-2 lg:px-4
        ${currentPage !== totalPages ? 'hover:bg-blue-300' : ''}
        `}
        >
        ＞
      </button>
      {/** 下一頁 */}
      
      {/** 最後一頁 */}
      <button 
        disabled={currentPage === totalPages}
        onClick={() => handlePage(totalPages)}
        className={`border rounded cursor-pointer px-1 lg:py-2 lg:px-4
        ${currentPage !== totalPages ? 'hover:bg-blue-300' : ''}
        `}
        >
        ＞|
      </button>
      {/** 最後一頁 */}

    </div>
    
    {/** 手動<input>跳轉頁碼 */}
    <div className="flex justify-center items-center gap-4">
      跳轉至:
        <input type="number"
          min="1"
          max={totalPages}
          className="border rounded px-2 text-center"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const value = + (event.target as HTMLInputElement).value;
              if(!isNaN(value) && value >=1 && value <= totalPages) {
                handlePage(value)
              }
            }
          }}> 
        </input>
      / {totalPages}頁
    </div>
    {/** 手動<input>跳轉頁碼 */}

  </div>
}