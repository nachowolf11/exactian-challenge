import EmployeeAction from "../components/EmployeeAction";
import EmployeeCreate from "../components/EmployeeCreate";
import ActiveEmployees from "../components/EmployeeList";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      <EmployeeCreate />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmployeeAction type="IN" />
        <EmployeeAction type="OUT" />
      </div>
      <h2 className="text-xl font-bold">Active Employees</h2>
      <ActiveEmployees />
    </div>
  );
}
