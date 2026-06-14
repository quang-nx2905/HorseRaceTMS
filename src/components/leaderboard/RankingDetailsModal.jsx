import Modal from "../common/Modal";

function RankingDetailsModal({
    open,
    onClose,
    ranking,
}) {

    if (!ranking) return null;

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Ranking Details"
        >

            <div className="space-y-4">

                <div>
                    <p className="text-zinc-500">
                        Rank
                    </p>
                    <h3 className="font-bold">
                        #{ranking.rank}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Horse
                    </p>
                    <h3 className="font-bold">
                        {ranking.horse}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Jockey
                    </p>
                    <h3 className="font-bold">
                        {ranking.jockey}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Wins
                    </p>
                    <h3 className="font-bold">
                        {ranking.wins}
                    </h3>
                </div>

                <div>
                    <p className="text-zinc-500">
                        Points
                    </p>
                    <h3 className="font-bold">
                        {ranking.points}
                    </h3>
                </div>

            </div>

        </Modal>

    );
}

export default RankingDetailsModal;