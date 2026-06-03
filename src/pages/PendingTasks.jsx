import Card from "../components/Card";
import StatCard from "../components/StatCard";

const PendingTasks = () => {
  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Pending Tasks
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Tasks that require your attention
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Pending" value="12" color="text-blue-600" />
        <StatCard title="High Priority" value="3" color="text-red-500" />
        <StatCard title="Due Today" value="2" color="text-orange-500" />
      </div>

      {/* Task List Card */}
      <Card>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-medium text-slate-800">
                Finish Assignment
              </h3>
              <p className="text-sm text-slate-500">
                Due tomorrow
              </p>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
              High
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PendingTasks;