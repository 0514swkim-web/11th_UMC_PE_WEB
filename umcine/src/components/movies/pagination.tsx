interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      gap: "10px",
      padding: "20px"
    }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: "10px 15px",
            backgroundColor: currentPage === page ? "#007bff" : "#f0f0f0",
            color: currentPage === page ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}