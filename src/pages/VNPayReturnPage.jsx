import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { topupService } from "../services/topupService";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

function VNPayReturnPage() {
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'failed'
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const processReturn = async () => {
      try {
        const query = location.search;
        if (!query) {
          setStatus("failed");
          return;
        }

        const data = await topupService.processIpn(query);
        if (data.RspCode === "00" || data.rspCode === "00") {
          setStatus("success");
          window.dispatchEvent(new Event("spectator-points-updated"));
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    };

    processReturn();
  }, [location]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 max-w-md w-full text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 size={48} className="animate-spin text-amber-500 mb-4" />
            <h2 className="text-xl font-bold text-zinc-900">Processing payment</h2>
            <p className="text-zinc-500 mt-2">Please do not close this window...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900">Payment Successful!</h2>
            <p className="text-zinc-500 mt-2">Your points have been updated.</p>
            <Link
              to="/profile"
              className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-colors inline-block w-full"
            >
              Back to Profile
            </Link>
          </div>
        )}

        {status === "failed" && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <XCircle size={64} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900">Payment Failed</h2>
            <p className="text-zinc-500 mt-2">An error occurred or you canceled the transaction.</p>
            <Link
              to="/profile"
              className="mt-6 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-bold transition-colors inline-block w-full"
            >
              Back to Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VNPayReturnPage;
