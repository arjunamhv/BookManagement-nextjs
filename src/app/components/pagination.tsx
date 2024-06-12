const Pagination = ({
  currentPage,
  setCurrentPage,
  isMutating,
  lastPage,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isMutating: boolean;
  lastPage: number;
}) => (
  <div className="flex justify-between my-4">
    <button
      className={`btn btn-primary ${
        currentPage === 1 || isMutating ? "disabled" : ""
      }`}
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1 || isMutating}
    >
      {isMutating && currentPage === 1 ? "Loading..." : "Previous"}
    </button>
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: lastPage }, (_, index) => (
        <button
          key={index + 1}
          className={`btn btn-primary ${
            currentPage === index + 1 ? "" : "btn-outline"
          }`}
          onClick={() => setCurrentPage(index + 1)}
          disabled={isMutating}
        >
          {index + 1}
        </button>
      ))}
    </div>
    <button
      className={`btn btn-primary ${isMutating ? "disabled" : ""}`}
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={isMutating}
    >
      {isMutating ? "Loading..." : "Next"}
    </button>
  </div>
);

export default Pagination;
