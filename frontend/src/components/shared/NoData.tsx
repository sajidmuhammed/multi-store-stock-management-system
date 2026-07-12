interface NoDataProps {
  message?: string;
}

export default function NoData({
  message = "No data found.",
}: NoDataProps) {
  return (
    <div className="py-10 text-center text-gray-500">
      {message}
    </div>
  );
}
