import Modal from "../common/Modal";

function JockeyDetailsModal({
    open,
    onClose,
    jockey,
}) {

    if (!jockey) return null;

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Jockey Profile"
        >

            <div className="space-y-5">

                <div>

                    <p className="text-zinc-500">
                        Name
                    </p>

                    <h2 className="text-2xl font-bold">
                        {jockey.name}
                    </h2>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Country
                    </p>

                    <h3 className="font-semibold">
                        {jockey.country}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Wins
                    </p>

                    <h3 className="font-semibold">
                        {jockey.wins}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Experience
                    </p>

                    <h3 className="font-semibold">
                        {jockey.experience}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Status
                    </p>

                    <h3 className="font-semibold">
                        {jockey.status}
                    </h3>

                </div>

            </div>

        </Modal>

    );
}

export default JockeyDetailsModal;