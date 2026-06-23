import { useState } from "react";
import { Plus, Search, Filter, Shield, User, Pencil, Trash2, Mail, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

import CreateUserModal from "../components/users/CreateUserModal";
import EditUserModal from "../components/users/EditUserModal";
import ConfirmModal from "../components/common/ConfirmModal";
import { useAuth } from "../context/AuthContext";

const roleColors = {
    Admin: "bg-purple-100 text-purple-700 ring-purple-200",
    Referee: "bg-blue-100 text-blue-700 ring-blue-200",
    User: "bg-zinc-100 text-zinc-700 ring-zinc-200",
};

const statusColors = {
    Active: "bg-emerald-100 text-emerald-700 ring-emerald-200 dot-emerald-500",
    Inactive: "bg-red-100 text-red-700 ring-red-200 dot-red-500",
};

function UserCard({ user, onEdit, onDelete, currentUser }) {
    const roleStyle = roleColors[user.role] || roleColors.User;
    const statusStyle = statusColors[user.status] || statusColors.Active;
    
    // Disable actions if the target user is an Admin
    const isTargetAdmin = user.role === "Admin";
    const canEditDelete = !isTargetAdmin;

    return (
        <div className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 group ${user.status === 'Inactive' ? 'border-red-200 bg-red-50/30' : 'border-zinc-200 hover:shadow-xl hover:-translate-y-1'}`}>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${isTargetAdmin ? 'bg-purple-100 text-purple-600' : 'bg-zinc-100 text-zinc-500'}`}>
                            {isTargetAdmin ? <ShieldAlert size={24} /> : <User size={24} />}
                        </div>
                        <div>
                            <h3 className={`font-black text-lg leading-tight ${user.status === 'Inactive' ? 'text-zinc-500 line-through' : 'text-zinc-900'}`}>
                                {user.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                                <Mail size={14} />
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ring-1 ${statusStyle.split(' ')[0]} ${statusStyle.split(' ')[1]} ${statusStyle.split(' ')[2]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.split(' ')[3]?.replace('dot-', 'bg-') || 'bg-emerald-500'}`} />
                        {user.status}
                    </span>
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-100">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ring-1 ${roleStyle}`}>
                        {user.role}
                    </span>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={() => canEditDelete && onEdit(user)}
                            disabled={!canEditDelete}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${canEditDelete ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200' : 'bg-zinc-50 text-zinc-300 cursor-not-allowed'}`}
                        >
                            <Pencil size={14} /> Edit
                        </button>
                        <button
                            onClick={() => canEditDelete && onDelete(user)}
                            disabled={!canEditDelete}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${canEditDelete ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-red-50/50 text-red-300 cursor-not-allowed'}`}
                        >
                            <Trash2 size={14} /> Disable
                        </button>
                    </div>
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

    const [usersList, setUsersList] = useState([
        { id: 1, name: "System Admin", email: "admin@horseracetms.com", role: "Admin", status: "Active" },
        { id: 2, name: "John Doe", email: "john.doe@example.com", role: "User", status: "Active" },
        { id: 3, name: "Jane Smith", email: "jane.referee@example.com", role: "Referee", status: "Active" },
        { id: 4, name: "Mike Johnson", email: "mike.j@example.com", role: "User", status: "Inactive" },
        { id: 5, name: "Sarah Connor", email: "sarah.c@example.com", role: "User", status: "Active" },
    ]);

    const roleFilters = ["All", "Admin", "Referee", "User"];

    const filtered = usersList.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                            u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = filterRole === "All" || u.role === filterRole;
        return matchSearch && matchRole;
    });

    const activeUsersCount = usersList.filter(u => u.status === "Active").length;
    const adminCount = usersList.filter(u => u.role === "Admin").length;

    const handleCreateUser = (newUser) => {
        setUsersList([newUser, ...usersList]);
        toast.success("User created successfully!");
    };

    const handleUpdateUser = (updatedUser) => {
        setUsersList(usersList.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        toast.success("User updated successfully!");
    };

    const handleConfirmDelete = () => {
        if (!selectedUser) return;
        
        // Soft delete: change status to Inactive instead of filtering out
        const updatedUsers = usersList.map(u => 
            u.id === selectedUser.id ? { ...u, status: "Inactive", isDeleted: true } : u
        );
        
        setUsersList(updatedUsers);
        toast.success("User has been disabled (soft deleted)!");
        setOpenDelete(false);
        setSelectedUser(null);
    };

    return (
        <div className="space-y-7 animate-in fade-in duration-500">
            {/* ── HEADER ── */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <ShieldAlert size={16} /> Admin Panel
                    </p>
                    <h1 className="text-5xl font-black text-zinc-900 tracking-tight">Users</h1>
                    <p className="text-zinc-500 mt-2 text-base">
                        Manage all platform users, roles, and access.
                    </p>
                </div>

                <button
                    onClick={() => setOpenCreate(true)}
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-zinc-900/20 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add User
                </button>
            </div>

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Users", value: usersList.length, icon: User, color: "bg-zinc-100", iconColor: "text-zinc-600" },
                    { label: "Active Users", value: activeUsersCount, icon: Shield, color: "bg-emerald-100", iconColor: "text-emerald-600" },
                    { label: "Administrators", value: adminCount, icon: ShieldAlert, color: "bg-purple-100", iconColor: "text-purple-600" },
                ].map(({ label, value, icon: Icon, color, iconColor }) => (
                    <div key={label} className="bg-white border border-zinc-200 rounded-2xl p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={20} className={iconColor} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-zinc-900">{value}</p>
                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── FILTERS ── */}
            <div className="flex items-center gap-4 flex-wrap">
                {/* Search */}
                <div className="relative flex-1 min-w-[240px]">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl outline-none text-sm focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/10 transition-all font-medium"
                    />
                </div>

                {/* Role filter chips */}
                <div className="flex items-center gap-2 bg-white border border-zinc-200 p-1.5 rounded-2xl">
                    <Filter size={14} className="text-zinc-400 ml-2 mr-1" />
                    {roleFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilterRole(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                filterRole === f
                                    ? "bg-zinc-100 text-zinc-900 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── CARD GRID ── */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-zinc-200 rounded-3xl border-dashed">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-4 border border-zinc-100">
                        <User size={28} className="text-zinc-300" />
                    </div>
                    <p className="font-bold text-zinc-700">No users found</p>
                    <p className="text-zinc-400 text-sm mt-1">Try adjusting your search or filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            currentUser={currentUser}
                            onEdit={(u) => { setSelectedUser(u); setOpenEdit(true); }}
                            onDelete={(u) => { setSelectedUser(u); setOpenDelete(true); }}
                        />
                    ))}
                </div>
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
                title="Disable User Account"
                message={`Are you sure you want to disable ${selectedUser?.name}? They will no longer be able to log in.`}
            />
        </div>
    );
}

export default UsersManagement;
