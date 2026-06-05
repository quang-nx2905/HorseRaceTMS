import Modal from "../common/Modal";

function HorseDetailsModal({
    open,
    onClose,
    horse,
}) {

    if (!horse) return null;

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Horse Details"
        >

            <div className="space-y-5">

                <div>

                    <p className="text-zinc-500">
                        Horse Name
                    </p>

                    <h3 className="text-xl font-bold dark:text-white">
                        {horse.name}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Breed
                    </p>

                    <h3 className="font-semibold dark:text-white">
                        {horse.breed}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Age
                    </p>

                    <h3 className="font-semibold dark:text-white">
                        {horse.age} Years
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Health
                    </p>

                    <h3 className="font-semibold dark:text-white">
                        {horse.health}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500">
                        Wins
                    </p>

                    <h3 className="font-semibold dark:text-white">
                        {horse.wins}
                    </h3>

                </div>

            </div>

        </Modal>

    );
}

export default HorseDetailsModal;