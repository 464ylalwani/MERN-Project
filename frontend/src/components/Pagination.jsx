export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          disabled={i + 1 === page}
          onClick={() => onPageChange(i + 1)}
          style={{
            margin: "0 0.25rem",
            backgroundColor: i + 1 === page ? "#646cff" : "#1a1a1a",
            color: i + 1 === page ? "#fff" : "#ccc",
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
