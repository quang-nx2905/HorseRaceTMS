import { useState } from "react";
import Pagination from "../components/common/Pagination";
import JockeyDetailsModal from "../components/jockeys/JockeyDetailsModal";
import CreateJockeyModal from "../components/jockeys/CreateJockeyModal";
import EditJockeyModal from "../components/jockeys/EditJockeyModal";
import ConfirmModal from "../components/common/ConfirmModal";
import toast from "react-hot-toast";

function Jockeys() {

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [openDetails, setOpenDetails] =
    useState(false);

  const [selectedJockey, setSelectedJockey] =
    useState(null);

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  const itemsPerPage = 4;

  const [jockeys, setJockeys] =
    useState([

      {
        name: "James Carter",
        country: "United Kingdom",
        wins: 48,
        experience: "8 Years",
        status: "Elite",
      },

      {
        name: "Ryan Cooper",
        country: "United States",
        wins: 36,
        experience: "5 Years",
        status: "Professional",
      },

      {
        name: "Akira Sato",
        country: "Japan",
        wins: 52,
        experience: "10 Years",
        status: "Elite",
      },

      {
        name: "Lucas Fernandez",
        country: "Spain",
        wins: 21,
        experience: "3 Years",
        status: "Rising Star",
      },

    ]);

  const handleCreateJockey = (
    jockey
  ) => {

    setJockeys((prev) => [
      jockey,
      ...prev,
    ]);

    toast.success(
      "Jockey created successfully!"
    );

  };

  const handleUpdateJockey = (
    updatedJockey
  ) => {

    setJockeys((prev) =>
      prev.map((jockey) =>
        jockey.id ===
          updatedJockey.id
          ? updatedJockey
          : jockey
      )
    );

    toast.success(
      "Jockey updated successfully!"
    );

  };

  const handleDeleteJockey = () => {

    setJockeys((prev) =>
      prev.filter(
        (jockey) =>
          jockey.id !==
          selectedJockey.id
      )
    );

    setOpenDelete(false);

    toast.success(
      "Jockey deleted successfully!"
    );

  };

  const filteredJockeys =
    jockeys.filter((jockey) =>
      jockey.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalPages =
    Math.ceil(
      filteredJockeys.length /
      itemsPerPage
    );

  const paginatedJockeys =
    filteredJockeys.slice(
      (currentPage - 1) *
      itemsPerPage,
      currentPage *
      itemsPerPage
    );

  return (

    <div>

      {/* HEADER */}
      <div
        className="flex items-center justify-between mb-10"
      >

        <div>

          <h1 className="page-title">
            Jockeys
          </h1>

          <p className="page-subtitle">
            Professional jockey management
            and performance overview.
          </p>

        </div>

        <button
          className="bg-yellow-400 hover:bg-yellow-500 transition-all px-6 py-4 rounded-2xl font-semibold"
        >
          <div className="flex gap-4">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search jockey..."
              className="bg-white border border-zinc-200 rounded-2xl px-5 py-4"
            />

            <button
              onClick={() =>
                setOpenCreate(true)
              }
              className="bg-yellow-400 hover:bg-yellow-500 transition-all px-6 py-4 rounded-2xl font-semibold"
            >
              + Add Jockey
            </button>

          </div>
        </button>

      </div>

      {/* GRID */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >

        {paginatedJockeys.map(
          (jockey, index) => (

            <div
              key={index}
              className="card p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* AVATAR */}
              <div
                className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-black mb-6"
              >
                {jockey.name.charAt(0)}
              </div>

              {/* NAME */}
              <h2
                className="text-3xl font-bold mb-2"
              >
                {jockey.name}
              </h2>

              {/* COUNTRY */}
              <p
                className="text-zinc-500 mb-8"
              >
                {jockey.country}
              </p>

              {/* STATS */}
              <div className="space-y-5 mb-8">

                <div
                  className="flex items-center justify-between"
                >

                  <p className="text-zinc-500">
                    Wins
                  </p>

                  <p className="font-bold text-xl">
                    {jockey.wins}
                  </p>

                </div>

                <div
                  className="flex items-center justify-between"
                >

                  <p className="text-zinc-500">
                    Experience
                  </p>

                  <p className="font-bold">
                    {jockey.experience}
                  </p>

                </div>

              </div>

              {/* STATUS */}
              <div className="mb-8">

                <span
                  className={`
  px-4
  py-2
  rounded-full
  text-sm
  font-semibold
                    ${jockey.status === "Elite"
  ? "bg-green-100 text-green-600"
  : jockey.status === "Professional"
  ? "bg-yellow-100 text-yellow-700"
  : "bg-blue-100 text-blue-600"
  }
`} 
                >
                  {jockey.status}
                </span>

              </div>

              <button
                onClick={() => {

                  setSelectedJockey(jockey);

                  setOpenEdit(true);

                }}
                className="w-full mb-3 bg-yellow-400 hover:bg-yellow-500 py-4 rounded-2xl font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() => {

                  setSelectedJockey(jockey);

                  setOpenDelete(true);

                }}
                className="w-full mb-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold"
              >
                Delete
              </button>

              {/* BUTTON */}
              <button
                onClick={() => {

                  setSelectedJockey(jockey);

                  setOpenDetails(true);

                }}
                className="w-full bg-zinc-900 hover:bg-black text-white py-4 rounded-2xl font-semibold transition-all"
              >
                View Profile
              </button>

            </div>

          ))}

      </div>

      <div className="mt-8">

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <JockeyDetailsModal
          open={openDetails}
          onClose={() =>
            setOpenDetails(false)
          }
          jockey={selectedJockey}
        />

        <CreateJockeyModal
          open={openCreate}
          onClose={() =>
            setOpenCreate(false)
          }
          onCreate={
            handleCreateJockey
          }
        />

        <EditJockeyModal
          open={openEdit}
          onClose={() =>
            setOpenEdit(false)
          }
          jockey={selectedJockey}
          onUpdate={
            handleUpdateJockey
          }
        />

        <ConfirmModal
          open={openDelete}
          onClose={() =>
            setOpenDelete(false)
          }
          onConfirm={
            handleDeleteJockey
          }
          title="Delete Jockey"
          message="Are you sure you want to delete this jockey?"
        />

      </div>

    </div>

  );
}

export default Jockeys;