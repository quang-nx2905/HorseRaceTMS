import { useState } from "react";
import { X, Loader2, Landmark, CircleDollarSign } from "lucide-react";
import toast from "react-hot-toast";
import axiosClient from "../api/axiosClient";

export default function WithdrawModal({ isOpen, onClose, currentPoints }) {
    const [amount, setAmount] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = {};
        const withdrawAmount = Number(amount.replace(/[^0-9]/g, ''));
        
        if (!amount) {
            newErrors.amount = "Amount is required.";
        } else if (withdrawAmount < 10) {
            newErrors.amount = "Minimum withdrawal is 10 PTS.";
        } else if (withdrawAmount > currentPoints) {
            newErrors.amount = "Insufficient points balance.";
        }

        if (!bankName.trim()) {
            newErrors.bankName = "Bank name is required.";
        }

        if (!accountNumber.trim()) {
            newErrors.accountNumber = "Account number is required.";
        }

        if (!accountName.trim()) {
            newErrors.accountName = "Account holder name is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        try {
            await axiosClient.post("/Topup/withdraw", {
                amount: withdrawAmount,
                bankName,
                accountNumber,
                accountName
            });
            
            toast.success("Withdrawal processed successfully!");
            onClose();
            window.location.reload();
            // Reset form
            setAmount("");
            setBankName("");
            setAccountNumber("");
            setAccountName("");
            setErrors({});
        } catch (error) {
            console.error("Failed to withdraw:", error);
            const msg = error.response?.data?.message || "An error occurred while withdrawing points.";
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInputClassName = (fieldName) => {
        const baseClass = "w-full px-4 py-3 bg-white border rounded-xl outline-none text-sm font-medium transition-all ";
        if (errors[fieldName]) {
            return baseClass + "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-red-900";
        }
        return baseClass + "border-zinc-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <CircleDollarSign size={18} className="text-amber-600" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900">Withdraw Points</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-700 transition-colors p-2 rounded-full hover:bg-zinc-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 bg-zinc-50/50">
                    <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/50 flex justify-between items-center">
                        <span className="text-sm font-semibold text-amber-700">Available Balance:</span>
                        <span className="text-lg font-black text-amber-600">{currentPoints.toLocaleString()} PTS</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.amount ? 'text-red-600' : 'text-zinc-600'}`}>
                                Amount to Withdraw (PTS)
                            </label>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => {
                                    setErrors(prev => ({ ...prev, amount: '' }));
                                    const val = e.target.value.replace(/[^0-9]/g, '');
                                    if (val) {
                                        setAmount(Number(val).toLocaleString('vi-VN'));
                                    } else {
                                        setAmount("");
                                    }
                                }}
                                className={getInputClassName('amount')}
                                placeholder="e.g. 10.000"
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-xs font-medium mt-1.5">{errors.amount}</p>
                            )}
                            <p className="text-[11px] text-zinc-400 font-medium mt-1.5">
                                10 PTS = 10,000 VND. Minimum withdrawal: 10 PTS.
                            </p>
                            {Number(amount.replace(/[^0-9]/g, '')) >= 10 && !errors.amount && (
                                <div className="mt-3 p-3 bg-zinc-100 rounded-lg text-sm space-y-1">
                                    <div className="flex justify-between text-zinc-500">
                                        <span>Withdraw Amount:</span>
                                        <span className="font-semibold">{Number(amount.replace(/[^0-9]/g, '')).toLocaleString()} PTS</span>
                                    </div>
                                    <div className="flex justify-between text-red-500">
                                        <span>System Fee (5%):</span>
                                        <span className="font-semibold">-{(Number(amount.replace(/[^0-9]/g, '')) * 0.05).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} PTS</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-900 pt-2 border-t border-zinc-200 mt-2">
                                        <span className="font-bold">You will receive:</span>
                                        <span className="font-black text-amber-600">
                                            {((Number(amount.replace(/[^0-9]/g, '')) * 0.95) * 1000).toLocaleString()} VND
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${errors.bankName ? 'text-red-600' : 'text-zinc-600'}`}>
                                <Landmark size={14} className={errors.bankName ? 'text-red-400' : 'text-zinc-400'} /> Bank Name
                            </label>
                            <input
                                type="text"
                                value={bankName}
                                onChange={(e) => {
                                    setErrors(prev => ({ ...prev, bankName: '' }));
                                    setBankName(e.target.value);
                                }}
                                className={getInputClassName('bankName')}
                                placeholder="e.g. Vietcombank"
                            />
                            {errors.bankName && (
                                <p className="text-red-500 text-xs font-medium mt-1.5">{errors.bankName}</p>
                            )}
                        </div>

                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.accountNumber ? 'text-red-600' : 'text-zinc-600'}`}>
                                Account Number
                            </label>
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => {
                                    setErrors(prev => ({ ...prev, accountNumber: '' }));
                                    setAccountNumber(e.target.value);
                                }}
                                className={getInputClassName('accountNumber')}
                                placeholder="Enter your account number"
                            />
                            {errors.accountNumber && (
                                <p className="text-red-500 text-xs font-medium mt-1.5">{errors.accountNumber}</p>
                            )}
                        </div>

                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${errors.accountName ? 'text-red-600' : 'text-zinc-600'}`}>
                                Account Holder Name
                            </label>
                            <input
                                type="text"
                                value={accountName}
                                onChange={(e) => {
                                    setErrors(prev => ({ ...prev, accountName: '' }));
                                    setAccountName(e.target.value);
                                }}
                                className={getInputClassName('accountName')}
                                placeholder="Enter full name on card"
                            />
                            {errors.accountName && (
                                <p className="text-red-500 text-xs font-medium mt-1.5">{errors.accountName}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white rounded-xl font-bold transition-all shadow-md disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Confirm Withdrawal"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
