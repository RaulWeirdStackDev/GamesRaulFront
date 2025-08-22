/* eslint-disable react/prop-types */
export const LoadingState = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen text-xl font-medium text-gray-300 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {message}
    </div>
  );
};