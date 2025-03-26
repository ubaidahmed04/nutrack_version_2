const TableSkeleton = () => {
    return (
      <div className="bg-white p-4 shadow rounded-lg md:col-span-3">
        <h2 className="text-lg font-semibold mb-2">Today Attendence</h2>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Department</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="text-center animate-pulse">
                  <td className="border border-gray-300 p-2">
                    <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default TableSkeleton;
  