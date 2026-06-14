import Modal from "../common/Modal";

function IncidentReportModal({
    open,
    onClose,
    race,
}) {

    if (!race) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Incident Report"
        >

            <div className="space-y-4">

                <div>

                    <p className="text-zinc-500">
                        Race
                    </p>

                    <h3 className="font-bold">
                        {race.race}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 mb-2">
                        Incident Type
                    </p>

                    <select
                        className="
              w-full
              border
              rounded-xl
              p-3
            "
                    >
                        <option>
                            Rule Violation
                        </option>

                        <option>
                            Horse Injury
                        </option>

                        <option>
                            Jockey Misconduct
                        </option>

                        <option>
                            Track Problem
                        </option>

                    </select>

                </div>

                <div>

                    <p className="text-zinc-500 mb-2">
                        Description
                    </p>

                    <textarea
                        rows="4"
                        className="
              w-full
              border
              rounded-xl
              p-3
            "
                    />

                </div>

                <button
                    className="
            w-full

            bg-red-500
            hover:bg-red-600

            text-white

            py-3

            rounded-xl
          "
                >
                    Submit Report
                </button>

            </div>

        </Modal>
    );
}

export default IncidentReportModal;