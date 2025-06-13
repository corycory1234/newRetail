interface Props {
  currentPage: number;
  totalPages: number;
  handlePage: (page: number) => void;
};

export function Pagination ({ currentPage, totalPages, handlePage} : Props) {
  const visiblePages = Array.from({length: Math.min(10, totalPages)}, (_, index) => index +1);

  return <>
    <div>
      <button disabled={currentPage === 1} 
        onClick={() => handlePage(currentPage -1)}>
        上一頁
      </button>

      {/** 分頁 - 20筆/每頁 */}
      {visiblePages.map((page) => {
        return <button
          key={page}
          onClick={() => handlePage(page)}>
          {page}
        </button>
      })}
      <span>
        跳轉至:
        <input type="number"
          min="1"
          max={totalPages}
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
      </span>
       {/** 分頁 - 20筆/每頁 */}


      <button 
        disabled={currentPage === totalPages} 
        onClick={() => handlePage(currentPage +1)}>
        下一頁
      </button>
      <button 
        disabled={currentPage === totalPages}
        onClick={() => handlePage(totalPages)}>
        最後一頁
      </button>
    </div>
  </>
}