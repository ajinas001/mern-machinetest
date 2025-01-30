import { useEffect, useState } from 'react';
import { addUser, deleteUser, editUser, fetchUsers } from '../Util/user';

export default function AgentsContent() {
    const [agents, setAgents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [newAgent, setNewAgent] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handlefetch = async () => {
        try {
            const result = await fetchUsers();
            if (result.success) {
                setAgents(result.data.data);
            } else {
                alert("Failed to fetch users");
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleadd = async () => {
        try {
            const result = await addUser(newAgent);
            if (result.success) {
                handlefetch();
                setShowAddModal(false);
                resetForm();
            } else {
                alert("Failed to add user");
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleEdit = async () => {
        try {
            const result = await editUser({selectedAgent }); // Pass ID and updated agent data
            if (result.success) {
                handlefetch(); // Fetch updated list after editing
                setShowEditModal(false);
                setSelectedAgent(null);
            } else {
                alert("Failed to edit user");
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleDelete = async (agentEmail) => {
        if (window.confirm('Are you sure you want to delete this agent?')) {
            try {
                const result = await deleteUser(agentEmail);
                if (result.success) {
                    const updatedAgents = agents.filter(agent => agent.email !== agentEmail);
                    setAgents(updatedAgents);
                } else {
                    alert("Failed to delete user");
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    useEffect(() => {
        handlefetch();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!newAgent.name?.trim()) {
            newErrors.name = 'Name is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newAgent.email || !emailRegex.test(newAgent.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (!newAgent.mobile) {
            newErrors.mobile = 'Mobile number is required';
        }
        if (!showEditModal && (!newAgent.password || newAgent.password.length < 8)) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setNewAgent({
            name: '',
            email: '',
            mobile: '',
            password: '',
        });
        setErrors({});
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Agents</h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Manage your team members
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Add Agent
                </button>
            </div>

            <div className="w-full bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                {/* Desktop header - hidden on mobile */}
                <div className="hidden md:grid md:grid-cols-4 px-6 py-3 bg-gray-50 dark:bg-gray-900">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Actions</div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {agents?.map((agent) => (
                        <div
                            key={agent.email}
                            className="grid grid-cols-1 md:grid-cols-4 gap-2 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            {/* Name */}
                            <div className="flex flex-col md:block">
                                <span className="md:hidden text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Name
                                </span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {agent.name}
                                </span>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col md:block">
                                <span className="md:hidden text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Email
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 break-all">
                                    {agent.email}
                                </span>
                            </div>

                            {/* Mobile */}
                            <div className="flex flex-col md:block">
                                <span className="md:hidden text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Mobile
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">
                                    {agent.mobile}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-4 mt-2 md:mt-0">
                                <button
                                    onClick={() => {
                                        setSelectedAgent(agent);
                                        setNewAgent({
                                            id:agent._id,
                                            name: agent.name,
                                            email: agent.email,
                                            mobile: agent.mobile,
                                            password: '',
                                        });
                                        setShowEditModal(true);
                                    }}
                                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(agent.email)}
                                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => {
                                setShowAddModal(false);
                                setShowEditModal(false);
                                resetForm();
                            }}
                        />

                        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                {showAddModal ? 'Add New Agent' : 'Edit Agent'}
                            </h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (validateForm()) {
                                        showAddModal ? handleadd() : handleEdit();
                                    }
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        value={showEditModal ? selectedAgent?.name : newAgent.name}
                                        onChange={(e) =>
                                            showEditModal
                                                ? setSelectedAgent({ ...selectedAgent, name: e.target.value })
                                                : setNewAgent({ ...newAgent, name: e.target.value })
                                        }
                                        className="mt-1 block w-full p-1 ps-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        value={showEditModal ? selectedAgent?.email : newAgent.email}
                                        onChange={(e) =>
                                            showEditModal
                                                ? setSelectedAgent({ ...selectedAgent, email: e.target.value })
                                                : setNewAgent({ ...newAgent, email: e.target.value })
                                        }
                                        className="mt-1 block w-full p-1 ps-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="+1 234-567-8900"
                                        value={showEditModal ? selectedAgent?.mobile : newAgent.mobile}
                                        onChange={(e) =>
                                            showEditModal
                                                ? setSelectedAgent({ ...selectedAgent, mobile: e.target.value })
                                                : setNewAgent({ ...newAgent, mobile: e.target.value })
                                        }
                                        className="mt-1 block w-full p-1 ps-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                                </div>

                                {/* Only show password fields when adding a new agent */}
                                {!showEditModal && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                            <input
                                                type="password"
                                                value={newAgent.password}
                                                onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                                                className="mt-1 block w-full p-1 ps-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            setShowEditModal(false);
                                            resetForm();
                                        }}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        {showAddModal ? 'Add Agent' : 'Update Agent'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
