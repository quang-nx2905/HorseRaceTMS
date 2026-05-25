import {
    useState,
    useEffect,
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

import Modal from "../components/ui/Modal";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Textarea from "../components/ui/Textarea";

import HorsesLoading from "../components/loading/HorsesLoading";

import EmptyState from "../components/ui/EmptyState";

const horses = [];

function Horses() {

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setTimeout(() => {

            setLoading(false);

        }, 2000);

    }, []);

    return (
        <DashboardLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-6xl font-bold">
                        Horses
                    </h1>

                    <p className="text-zinc-500 mt-3 text-lg">
                        Manage race horses, performance metrics, and health records.
                    </p>

                </div>

                <Button onClick={() => setOpen(true)}>
                    + Add Horse
                </Button>

            </div>

            {/* Search */}
            <div className="flex gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search horses..."
                    className="
            flex-1
            bg-white
            border
            border-zinc-200
            rounded-2xl
            px-6
            py-4
            outline-none
          "
                />

                <Button variant="secondary">
                    Active
                </Button>

                <Button variant="secondary">
                    Recovery
                </Button>

                <Button variant="secondary">
                    Training
                </Button>

            </div>

            {/* Loading */}
            {loading ? (

                <HorsesLoading />

            ) : horses.length === 0 ? (

                <EmptyState
                    title="No Horses Found"
                    description="
            There are currently no horses
            registered in the tournament system.
          "
                    buttonText="Add First Horse"
                />

            ) : (

                <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden">

                    {/* Header */}
                    <div className="
            grid
            grid-cols-6
            px-8
            py-6
            border-b
            border-zinc-100
            bg-zinc-50
            font-semibold
            text-zinc-500
          ">

                        <div>Horse</div>
                        <div>Breed</div>
                        <div>Age</div>
                        <div>Status</div>
                        <div>Win Rate</div>
                        <div>Actions</div>

                    </div>

                    {/* Rows */}
                    {horses.map((horse, index) => (

                        <div
                            key={index}
                            className="
                grid
                grid-cols-6
                px-8
                py-6
                border-b
                border-zinc-100
                items-center
              "
                        >

                            <div>

                                <h3 className="font-bold text-lg">
                                    {horse.name}
                                </h3>

                                <p className="text-zinc-400 mt-1">
                                    {horse.stable}
                                </p>

                            </div>

                            <div>{horse.breed}</div>

                            <div>{horse.age}</div>

                            <div>
                                <StatusBadge status={horse.status} />
                            </div>

                            <div className="font-semibold">
                                {horse.winRate}
                            </div>

                            <div className="flex gap-3">

                                <Button variant="secondary">
                                    Edit
                                </Button>

                                <Button variant="danger">
                                    Delete
                                </Button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {/* Modal */}
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Add New Horse"
            >

                <div className="space-y-6">

                    <Input
                        label="Horse Name"
                        placeholder="Enter horse name"
                    />

                    <Input
                        label="Breed"
                        placeholder="Enter horse breed"
                    />

                    <Input
                        label="Age"
                        placeholder="Enter horse age"
                    />

                    <Select
                        label="Status"
                        options={[
                            "Active",
                            "Training",
                            "Recovery",
                        ]}
                    />

                    <Textarea
                        label="Description"
                        placeholder="Horse performance details..."
                    />

                    <div className="flex justify-end gap-4 pt-4">

                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={() => {

                                toast.success(
                                    "Horse added successfully"
                                );

                                setOpen(false);

                            }}
                        >
                            Save Horse
                        </Button>

                    </div>

                </div>

            </Modal>

        </DashboardLayout>
    );
}

export default Horses;