const Topbar = ({ setMobileOpen }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
      <button
        onClick={() => setMobileOpen(true)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
      >
        ☰
      </button>

      <h1 className="text-lg font-bold text-indigo-600">
        Task Manager
      </h1>

      <div className="w-8" />
    </header>
  );
};

export default Topbar;