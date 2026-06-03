const TaskSkeleton = () => {
  return (
    <div className="p-4 rounded-lg shadow bg-gray-100 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-4/5 mb-3"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-300 rounded w-20"></div>
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
};

const TaskSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <TaskSkeleton key={i} />
      ))}
    </div>
  );
};

export default TaskSkeletonGrid;