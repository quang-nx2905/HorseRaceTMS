import { useState, useEffect } from "react";
import { Plus, Search, Filter, Shield, User, Pencil, Trash2, Mail, ShieldAlert, BadgeCheck, Unlock, Crown, Flag, Eye, Ban } from "lucide-react";
import toast from "react-hot-toast";

import CreateUserModal from "../components/users/CreateUserModal";
import EditUserModal from "../components/users/EditUserModal";
import ConfirmModal from "../components/common/ConfirmModal";
import Pagination from "../components/common/Pagination";
import { userApi } from "../api/userApi";
import { getProfileAvatar } from "../utils/media";

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

function UserCard({ user, onEdit, onToggleStatus, onDelete }) {
    const config = roleConfig[user.role] || roleConfig.Spectator;
    const Icon = config.icon;
    const isActive = user.status === "Active";
    const avatar = getProfileAvatar(user);

    // Disable actions if the target user is an Admin
    const isTargetAdmin = user.role === "Admin";
    const canEditDelete = !isTargetAdmin;

    return (
        <div className={`group relative overflow-hidden rounded-[2rem] border bg-white p-6 shadow-sm transition-all duration-300 ${isActive ? 'border-zinc-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-2xl hover:shadow-zinc-200/60' : 'border-red-200 bg-red-50/30 opacity-90'}`}>
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${config.gradient}`} />

            {/* Background Pattern for Admin */}
            {isTargetAdmin && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none" />
            )}

            <div className="relative mb-5 flex items-start justify-between pt-1">
                <div className="flex items-center gap-4 w-full min-w-0">
                    <div className={`relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-visible rounded-2xl bg-gradient-to-br text-white shadow-lg ${config.gradient} ${isTargetAdmin ? 'shadow-purple-500/30' : 'shadow-zinc-400/20'}`}>
                        {avatar ? (
                            <img src={avatar} alt={user.name} className="h-full w-full rounded-2xl object-cover" />
                        ) : (
                            <Icon size={24} strokeWidth={2} />
                        )}
                        {isActive && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                        )}
                        {!isActive && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`flex items-center gap-2 text-lg font-black leading-tight ${isActive ? 'text-zinc-900' : 'text-zinc-500 line-through decoration-zinc-300'}`}>
                            <span className="truncate">{user.name}</span>
                            {isTargetAdmin && <BadgeCheck size={18} className="text-purple-500 flex-shrink-0" />}
                        </h3>
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                            <Mail size={14} className="text-zinc-400 flex-shrink-0" />
                            <span className="truncate block" title={user.email}>{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-zinc-50 p-3 text-xs">
                <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400">User ID</p>
                    <p className="mt-1 font-bold text-zinc-700">#{user.id}</p>
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Account</p>
                    <p className={`mt-1 font-bold ${isActive ? "text-emerald-600" : "text-red-500"}`}>{user.status}</p>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-100/80 pt-5">
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
                        onClick={() => canEditDelete && onToggleStatus(user)}
                        disabled={!canEditDelete}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${!canEditDelete ? 'bg-zinc-50/50 text-zinc-300 cursor-not-allowed' :
                            isActive ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600'
                            }`}
                        title={isActive ? "Deactivate User" : "Reactivate User"}
                    >
                        {isActive ? <Ban size={16} /> : <Unlock size={16} />}
                    </button>
                    <button
                        onClick={() => canEditDelete && onDelete(user)}
                        disabled={!canEditDelete}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${!canEditDelete ? 'bg-zinc-50/50 text-zinc-300 cursor-not-allowed' :
                            'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600'
                            }`}
                        title="Permanently Delete User"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function UsersManagement() {
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("All");

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openPermanentDelete, setOpenPermanentDelete] = useState(false);
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
            throw error;
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
            setUsersList(usersList.map((u) =>
                u.id === updatedUser.id
                    ? { ...updatedUser, avatar: updatedUser.removeAvatar ? null : updatedUser.avatar }
                    : u
            ));
            toast.success("User updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update user");
            console.error(error);
            throw error;
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
        } catch {
            toast.error("Failed to update user status");
        } finally {
            setOpenDelete(false);
            setSelectedUser(null);
        }
    };

    const handleConfirmPermanentDelete = async () => {
        if (!selectedUser) return;

        try {
            await userApi.deleteUser(selectedUser.id);
            setUsersList(usersList.filter(u => u.id !== selectedUser.id));
            setTotalCount(prev => prev - 1);
            toast.success("User permanently deleted!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user permanently");
        } finally {
            setOpenPermanentDelete(false);
            setSelectedUser(null);
        }
    };

    return (
        <div className="w-full space-y-6 pb-10 animate-in fade-in duration-500">
            {/* ── HEADER ── */}
            <section className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-7 text-white shadow-xl shadow-zinc-300/40 md:p-9">
                <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
                <div className="absolute right-40 top-0 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-400">
                        <ShieldAlert size={15} strokeWidth={2.5} /> Administration
                    </p>
                    <h1 className="text-3xl font-black tracking-tight md:text-4xl">User Management</h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Control platform identities, roles and account access.
                    </p>
                </div>

                <button
                    onClick={() => setOpenCreate(true)}
                    className="group flex items-center gap-2 rounded-2xl bg-amber-400 px-6 py-3.5 font-black text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-amber-500"
                >
                    <Plus size={20} className="transition-transform group-hover:rotate-90" />
                    Create New User
                </button>
                </div>
            </section>

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                    { label: "Total Users", value: totalCount, icon: User, iconColor: "text-zinc-700", iconBg: "bg-zinc-100" },
                    { label: "Active Users", value: activeUsersCount, icon: Shield, iconColor: "text-emerald-600", iconBg: "bg-emerald-100" },
                    { label: "Administrators", value: adminCount, icon: ShieldAlert, iconColor: "text-violet-600", iconBg: "bg-violet-100" },
                ].map((stat) => (
                    <div key={stat.label} className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-5 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${stat.iconBg}`}>
                                <stat.icon size={24} className={stat.iconColor} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-zinc-900">{stat.value}</p>
                                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-zinc-400">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── FILTERS ── */}
            <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] border border-zinc-200 bg-white p-3 shadow-sm">
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
                <div className="flex max-w-full items-center gap-1 overflow-x-auto px-2 pb-1 sm:pb-0">
                    <Filter size={16} className="text-zinc-400 ml-2 mr-2" />
                    {roleFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => { setFilterRole(f); setCurrentPage(1); }}
                            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${filterRole === f
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
                                onToggleStatus={(u) => { setSelectedUser(u); setOpenDelete(true); }}
                                onDelete={(u) => { setSelectedUser(u); setOpenPermanentDelete(true); }}
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

            <ConfirmModal
                open={openPermanentDelete}
                onClose={() => setOpenPermanentDelete(false)}
                onConfirm={handleConfirmPermanentDelete}
                title="Permanently Delete User Account"
                message={`Are you sure you want to PERMANENTLY delete ${selectedUser?.name}? This action CANNOT be undone and will delete all associated data (horses, results, details).`}
                confirmLabel="Permanently Delete"
                confirmVariant="danger"
            />
        </div>
    );
}

export default UsersManagement;
