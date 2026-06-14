import Modal from "../common/Modal";

function RaceMonitorModal({
    open,
    onClose,
    race,
}) {

    if (!race) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Race Monitoring"
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
                    <p className="text-zinc-500">
                        Track
                    </p>

                    <h3 className="font-bold">
                        {race.track}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Status
                    </p>

                    <h3 className="font-bold">
                        {race.status}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Participating Horses
                    </p>

                    <h3 className="font-bold">
                        {race.horses}
                    </h3>
                </div>

            </div>

        </Modal>
    );
}

export default RaceMonitorModal;