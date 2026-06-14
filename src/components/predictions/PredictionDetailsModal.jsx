import Modal from "../common/Modal";

function PredictionDetailsModal({
    open,
    onClose,
    prediction,
}) {

    if (!prediction) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Prediction Details"
        >

            <div className="space-y-4">

                <div>
                    <p className="text-zinc-500">
                        Horse
                    </p>

                    <h3 className="font-bold">
                        {prediction.horse}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Race
                    </p>

                    <h3 className="font-bold">
                        {prediction.race}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Confidence
                    </p>

                    <h3 className="font-bold">
                        {prediction.confidence}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Odds
                    </p>

                    <h3 className="font-bold">
                        {prediction.odds}
                    </h3>
                </div>

            </div>

        </Modal>
    );
}

export default PredictionDetailsModal;