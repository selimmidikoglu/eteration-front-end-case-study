import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/store/products/productSlice";

type Props = {};

const Pagination = (props: Props) => {
  const dispatch = useDispatch();
  const {
    currentPage,
    totalPageNumber,
    brandCurrentPage,
    brandFilteredTotalPageNumber,
  } = useSelector((state: RootState) => state.productSlice);

  const changePage = (chosenPage: number) => {
    dispatch(setPage(chosenPage));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Determine the range of page numbers to display
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPageNumber, startPage + 3);

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => changePage(1)}
          className={`mx-2 w-10 h-10 text-black text-sm ${
            1 === currentPage ? "font-bold bg-white rounded" : ""
          }`}
        >
          {1}
        </button>
      );

      if (startPage > 2) {
        pageNumbers.push(
          <span
            key="ellipsis-start"
            className="mx-2 w-10 h-10 text-black text-sm"
          >
            &#x2026;
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`mx-2 w-10 h-10 text-black text-sm ${
            i === currentPage ? "font-bold bg-white rounded" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPageNumber) {
      if (endPage < totalPageNumber - 1) {
        pageNumbers.push(
          <span
            key="ellipsis-end"
            className="mx-2 w-10 h-10 text-black text-sm"
          >
            &#x2026;
          </span>
        );
      }

      pageNumbers.push(
        <button
          key={totalPageNumber}
          onClick={() => changePage(totalPageNumber)}
          className={`mx-2 w-10 h-10 text-black text-sm ${
            totalPageNumber === currentPage ? "font-bold bg-white rounded" : ""
          }`}
        >
          {totalPageNumber}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full h-20 col-span-4 flex justify-center">
      <div className="w-50 flex justify-center items-center">
        {currentPage > 1 && (
          <button
            onClick={() => changePage(currentPage - 1)}
            className="mx-2 w-10 h-10 text-black text-sm"
          >
            &lt;
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPageNumber && (
          <button
            onClick={() => changePage(currentPage + 1)}
            className="mx-2 w-10 h-10 text-black text-sm"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
