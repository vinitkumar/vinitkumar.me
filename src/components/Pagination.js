import React from "react"

const Pagination = ({
  currentPage,
  locale = "en",
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  const isJapanese = locale === "ja"

  const getPageNumbers = () => {
    const pages = []
    const showEllipsisStart = currentPage > 3
    const showEllipsisEnd = currentPage < totalPages - 2

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (showEllipsisStart) {
        pages.push("...")
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (showEllipsisEnd) {
        pages.push("...")
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <nav
      className="pagination"
      aria-label={isJapanese ? "記事一覧のページ移動" : "Blog pagination"}
    >
      <button
        className="pagination-btn pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={isJapanese ? "前のページ" : "Previous page"}
      >
        ← {isJapanese ? "前へ" : "Prev"}
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
              aria-label={isJapanese ? `${page}ページ` : `Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="pagination-btn pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={isJapanese ? "次のページ" : "Next page"}
      >
        {isJapanese ? "次へ" : "Next"} →
      </button>
    </nav>
  )
}

export default Pagination
