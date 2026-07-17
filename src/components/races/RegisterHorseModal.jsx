import React, { useState, useEffect } from "react";
import { Loader2, PlusCircle, Check } from "lucide-react";
import Modal from "../common/Modal";
import api from "../../api/axiosClient";
import raceApi from "../../api/raceApi";
import toast from "react-hot-toast";

function RegisterHorseModal({ open, onClose, raceId, ownerId, onSuccess }) {
  const [horses, setHorses] = useState([]);
  const [selectedHorseId, setSelectedHorseId] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open || !ownerId || !raceId) return;

    const loadHorses = async () => {
      setLoadingData(true);
      try {
        // Fetch all owner's horses
        const response = await api.get(`/horses/owner/${ownerId}`);
        const allHorses = response?.data?.data || response?.data || [];
        
        // Filter horses that are verified/active if needed, or display all. 
        // We'll show all horses but warn if not approved/verified yet.
        setHorses(allHorses);
      } catch (err) {
        console.error("Error loading horses for registration:", err);
        toast.error("Failed to load your horses.");
      } finally {
        setLoadingData(false);
      }
    };

    loadHorses();
  }, [open, ownerId, raceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHorseId) {
      toast.error("Please select a horse to register.");
      return;
    }

    setSubmitting(true);
    try {
      await raceApi.registerHorse(raceId, parseInt(selectedHorseId));
      toast.success("Horse registered successfully! Awaiting admin review.");
      setSelectedHorseId("");
      onSuccess?.();
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to register horse.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Register Horse for Race" width="w-[480px]">
      <p className="text-zinc-500 text-sm -mt-6 mb-6">
        Select one of your horses to participate in this race. The request will be reviewed by the administrator.
      </p>

      {loadingData ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
          <span className="ml-2 text-zinc-500 text-sm font-semibold">Loading your horses...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Select Horse *</label>
            {horses.length === 0 ? (
              <div className="p-4 bg-zinc-50 rounded-xl border border-dashed border-zinc-200 text-center text-sm text-zinc-500 font-medium">
                You don't have any horses. Please add a horse to your profile first.
              </div>
            ) : (
              <div className="grid gap-3 max-h-[240px] overflow-y-auto pr-1">
                {horses.map((horse) => {
                  const isSelected = selectedHorseId === String(horse.horseId);
                  return (
                    <div
                      key={horse.horseId}
                      onClick={() => setSelectedHorseId(String(horse.horseId))}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "border-amber-500 bg-amber-50/50 shadow-sm"
                          : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 overflow-hidden flex-shrink-0 border border-amber-200 flex items-center justify-center text-zinc-500">
                          {horse.imageUrl ? (
                            <img src={horse.imageUrl} alt={horse.horseName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-amber-700">{horse.horseName[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-800 text-sm leading-snug">{horse.horseName}</p>
                          <p className="text-xs text-zinc-500 font-medium mt-0.5">
                            Breed: {horse.breed || "N/A"} • Health: {horse.healthStatus || "Healthy"}
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? "bg-amber-500 border-amber-500 text-white" : "border-zinc-300"
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 text-zinc-700 font-bold text-sm hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || horses.length === 0 || !selectedHorseId}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <PlusCircle size={16} />
              )}
              {submitting ? "Registering..." : "Submit Registration"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default RegisterHorseModal;
