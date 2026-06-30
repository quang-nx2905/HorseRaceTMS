import { useState, useEffect } from "react";
import { Plus, Search, Filter, Shield, User, Pencil, Trash2, Mail, ShieldAlert, BadgeCheck, Unlock, Crown, Flag, Eye } from "lucide-react";
import toast from "react-hot-toast";

import CreateUserModal from "../components/users/CreateUserModal";
import EditUserModal from "../components/users/EditUserModal";
import ConfirmModal from "../components/common/ConfirmModal";
import Pagination from "../components/common/Pagination";
import { useAuth } from "../context/AuthContext";
import { userApi } from "../api/userApi";

const roleConfig = {
    Admin: {
        gradient: "from-purple-500 to-indigo-600",
        badge: "bg-purple-100 text-purple-700 ring-purple-200",
        icon: ShieldAlert
    },
    Referee: {
        gradient: "from-blue-400 to-cyan-500",
        badge: "bg-blue-100 text-blue-700 ring-blue-200",
        icon: Shield
    },
    HorseOwner: {
        gradient: "from-amber-400 to-orange-500",
        badge: "bg-amber-100 text-amber-700 ring-amber-200",
        icon: Crown
    },
    Jockey: {
        gradient: "from-rose-400 to-red-500",
        badge: "bg-rose-100 text-rose-700 ring-rose-200",
        icon: Flag
    },
    Spectator: {
        gradient: "from-zinc-400 to-zinc-600",
        badge: "bg-zinc-100 text-zinc-700 ring-zinc-200",
        icon: Eye
    },
};

function UserCard({ user, onEdit, onDelete }) {
    const config = roleConfig[user.role] || roleConfig.Spectator;
    const Icon = config.icon;
    const isActive = user.status === "Active";

    // Disable actions if the target user is an Admin
    const isTargetAdmin = user.role === "Admin";
    const canEditDelete = !isTargetAdmin;

    return (
        <div className={`relative bg-white border rounded-[2rem] p-6 transition-all duration-300 group ${isActive ? 'border-zinc-200 hover:shadow-2xl hover:shadow-zinc-200/50 hover:-translate-y-1' : 'border-red-100 bg-red-50/30 opacity-90'}`}>

            {/* Background Pattern for Admin */}
            {isTargetAdmin && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none" />
            )}

            <div className="relative flex items-start justify-between mb-5">
                <div className="flex items-center gap-4 w-full min-w-0">
                    <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${config.gradient} text-white shadow-lg ${isTargetAdmin ? 'shadow-purple-500/30' : 'shadow-zinc-400/20'}`}>
                        <Icon size={24} strokeWidth={2} />
                        {isActive && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                        )}
                        {!isActive && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-black text-xl leading-tight flex items-center gap-2 ${isActive ? 'text-zinc-900' : 'text-zinc-500 line-through decoration-zinc-300'}`}>
                            <span className="truncate">{user.name}</span>
                            {isTargetAdmin && <BadgeCheck size={18} className="text-purple-500 flex-shrink-0" />}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-zinc-500 mt-1 font-medium">
                            <Mail size={14} className="text-zinc-400 flex-shrink-0" />
                            <span className="truncate block" title={user.email}>{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-5 border-t border-zinc-100/80">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ring-1 ${config.badge}`}>
                    {user.role}
                </span>

                <div className="flex gap-2">
                    <button
                        onClick={() => canEditDelete && onEdit(user)}
                        disabled={!canEditDelete}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${canEditDelete ? 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900' : 'bg-zinc-50/50 text-zinc-300 cursor-not-allowed'}`}
                        title="Edit User"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => canEditDelete && onDelete(user)}
                        disabled={!canEditDelete}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${!canEditDelete ? 'bg-zinc-50/50 text-zinc-300 cursor-not-allowed' :
                            isActive ? 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600'
                            }`}
                        title={isActive ? "Deactivate User" : "Reactivate User"}
                    >
                        {isActive ? <Trash2 size={16} /> : <Unlock size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

function UsersManagement() {
    const { user: currentUser } = useAuth();
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("All");

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [usersList, setUsersList] = useState([]);

    // Pagination and API state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await userApi.getUsers({
                    search: search,
                    role: filterRole,
                    page: currentPage,
                    pageSize: pageSize
                });
                setUsersList(data.items);
                setTotalCount(data.totalCount);
                setTotalPages(data.totalPages);
            } catch (error) {
                toast.error("Failed to load users");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, filterRole, currentPage, pageSize]);

    const roleFilters = ["All", "Admin", "Referee", "Spectator", "Jockey", "HorseOwner"];

    // Since filtering is done in backend, we don't need local filter logic
    const filtered = usersList;

    const activeUsersCount = usersList.filter(u => u.status === "Active").length;
    const adminCount = usersList.filter(u => u.role === "Admin").length;

    const handleCreateUser = async (newUser) => {
        try {
            const createdUser = await userApi.createUser(newUser);
            setUsersList([createdUser, ...usersList]);
            setTotalCount(prev => prev + 1);
            toast.success("User created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create user");
            console.error(error);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await userApi.updateUser(updatedUser.id, {
                fullName: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                experienceYear: updatedUser.experienceYear ? parseInt(updatedUser.experienceYear) : null,
                expYears: updatedUser.expYears ? parseInt(updatedUser.expYears) : null,
                totalPoints: updatedUser.totalPoints ? parseInt(updatedUser.totalPoints) : null,
                removeAvatar: updatedUser.removeAvatar || false
            });
            setUsersList(usersList.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            toast.success("User updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update user");
            console.error(error);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedUser) return;

        try {
            await userApi.toggleUserStatus(selectedUser.id);
            const updatedUsers = usersList.map(u =>
                u.id === selectedUser.id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
            );

            setUsersList(updatedUsers);
            toast.success(`User has been ${selectedUser.status === "Active" ? "deactivated" : "reactivated"} successfully!`);
        } catch (error) {
            toast.error("Failed to update user status");
        } finally {
            setOpenDelete(false);
            setSelectedUser(null);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* ── HEADER ── */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <ShieldAlert size={16} strokeWidth={2.5} /> Administration
                    </p>
                    <h1 className="text-5xl font-black text-zinc-900 tracking-tight">Access Control</h1>
                    <p className="text-zinc-500 mt-3 text-lg font-medium">
                        Manage platform users, roles, and system access.
                    </p>
                </div>

                <button
                    onClick={() => setOpenCreate(true)}
                    className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-7 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-zinc-900/20 hover:shadow-zinc-900/30 hover:-translate-y-0.5"
                >
                    <Plus size={20} className="transition-transform group-hover:rotate-90" />
                    Create New User
                </button>
            </div>

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { label: "Total Users", value: totalCount, icon: User, bg: "bg-white", border: "border-zinc-200", iconColor: "text-zinc-600", iconBg: "bg-zinc-100" },
                    { label: "Active Users", value: activeUsersCount, icon: Shield, bg: "bg-gradient-to-br from-emerald-400 to-teal-500", border: "border-emerald-400", textColor: "text-white", iconColor: "text-emerald-500", iconBg: "bg-white", isDark: true },
                    { label: "Administrators", value: adminCount, icon: ShieldAlert, bg: "bg-gradient-to-br from-purple-500 to-indigo-600", border: "border-purple-500", textColor: "text-white", iconColor: "text-purple-600", iconBg: "bg-white", isDark: true },
                ].map((stat) => (
                    <div key={stat.label} className={`relative overflow-hidden rounded-[2rem] p-6 border shadow-lg ${stat.bg} ${stat.border} ${stat.isDark ? 'shadow-current/20' : 'shadow-zinc-200/50'}`}>
                        {stat.isDark && (
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none" />
                        )}
                        <div className="flex items-center gap-5 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${stat.iconBg}`}>
                                <stat.icon size={24} className={stat.iconColor} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className={`text-4xl font-black ${stat.textColor || 'text-zinc-900'}`}>{stat.value}</p>
                                <p className={`text-sm font-bold uppercase tracking-wider mt-1 ${stat.textColor ? 'text-white/80' : 'text-zinc-500'}`}>{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── FILTERS ── */}
            <div className="flex items-center gap-4 flex-wrap bg-white p-3 rounded-[2rem] shadow-sm border border-zinc-200">
                {/* Search */}
                <div className="relative flex-1 min-w-[280px]">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-12 pr-5 py-4 bg-zinc-50 border border-transparent rounded-2xl outline-none font-medium focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10 transition-all text-zinc-900 placeholder:text-zinc-400"
                    />
                </div>

                {/* Role filter chips */}
                <div className="flex items-center gap-2 px-2">
                    <Filter size={16} className="text-zinc-400 ml-2 mr-2" />
                    {roleFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => { setFilterRole(f); setCurrentPage(1); }}
                            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all ${filterRole === f
                                ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/20"
                                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── CARD GRID ── */}
            {isLoading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-zinc-200 rounded-[3rem] border-dashed">
                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-50 flex items-center justify-center mb-6 border border-zinc-100 shadow-sm">
                        <User size={32} className="text-zinc-300" strokeWidth={1.5} />
                    </div>
                    <p className="text-2xl font-black text-zinc-800">No users found</p>
                    <p className="text-zinc-500 text-lg mt-2 font-medium">Try adjusting your search or filter</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onEdit={(u) => { setSelectedUser(u); setOpenEdit(true); }}
                                onDelete={(u) => { setSelectedUser(u); setOpenDelete(true); }}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    )}
                </>
            )}

            {/* ── MODALS ── */}
            <CreateUserModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreateUser}
            />

            <EditUserModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                user={selectedUser}
                onSave={handleUpdateUser}
            />

            <ConfirmModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
                title={selectedUser?.status === "Active" ? "Deactivate User Account" : "Reactivate User Account"}
                message={
                    selectedUser?.status === "Active"
                        ? `Are you sure you want to deactivate ${selectedUser?.name}? They will no longer be able to log in.`
                        : `Are you sure you want to reactivate ${selectedUser?.name}? They will be able to log in again.`
                }
                confirmLabel={selectedUser?.status === "Active" ? "Deactivate" : "Restore Account"}
                confirmVariant={selectedUser?.status === "Active" ? "danger" : "success"}
            />
        </div>
    );
}

export default UsersManagement;
