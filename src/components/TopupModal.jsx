import { useState } from "react";
import { Loader2, X, CreditCard } from "lucide-react";
import { topupService } from "../services/topupService";
import toast from "react-hot-toast";

function TopupModal({ isOpen, onClose }) {
  const [points, setPoints] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const paymentAmount = points * 1000;

  const handleTopup = async () => {
    if (points < 10) {
      toast.error("Minimum top-up is 10 points (10,000 VND)");
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await topupService.createPaymentUrl(paymentAmount);
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the payment transaction.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <CreditCard className="text-amber-500" />
              Top Up Points
            </h3>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700 block mb-1">
                Points to top up (1 Point = 1,000 VND)
              </label>
              <input
                type="number"
                min="10"
                step="10"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-zinc-800 font-semibold focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all"
                placeholder="Enter points (e.g., 50)"
              />
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100 flex items-start gap-3">
              <div className="mt-0.5">ℹ️</div>
              <div>
                <p className="font-semibold">Pay via VNPay Sandbox</p>
                <p className="mt-1">
                  The payment amount will be <strong>{paymentAmount.toLocaleString()} VND</strong>. Please use a VNPay Sandbox test card.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleTopup}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopupModal;
