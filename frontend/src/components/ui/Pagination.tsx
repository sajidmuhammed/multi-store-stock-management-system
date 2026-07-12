import Button from "./Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={page === 1}
      >
        Previous
      </Button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
