"use client";
import { useState, useEffect } from 'react';
import { fetch } from '../Util/distribute';

export default function DistributedContent() {
    const [distributedData, setDistributedData] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDistributedData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch();
                console.log(response, "response");

                const data = response.data.data; // Access the data array
                console.log(data, "data");

                if (data) {
                    setDistributedData(data); // Set the entire data array
                }
            } catch (err) {
                setError("Failed to fetch distributed data");
                console.error("Error fetching distributed data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDistributedData();
    }, []);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
        );
    }

    if (!distributedData.length) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-600 dark:text-yellow-400">No distributed data available.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Distribution Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 dark:text-blue-400">Total Agents</p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                            {distributedData.length}
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <p className="text-sm text-green-600 dark:text-green-400">Total Records</p>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                            {distributedData.reduce((acc, curr) => acc + curr.data.length, 0)}
                        </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <p className="text-sm text-purple-600 dark:text-purple-400">Average Records/Agent</p>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                            {Math.round(distributedData.reduce((acc, curr) => acc + curr.data.length, 0) / distributedData.length)}
                        </p>
                    </div>
                </div>
            </div>

            {distributedData.map((item, index) => (
                <div key={index} className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Agent {index + 1}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Name:</strong> {item.agent.name} | <strong>Email:</strong> {item.agent.email} | <strong>Mobile:</strong> {item.agent.mobile}
                    </p>
                    <div className="overflow-x-auto mt-2">
                        <table className="min-w-full border border-gray-300 dark:border-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    {item.data[0] && Object.keys(item.data[0]).map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="py-3 px-6 text-left text-sm font-medium text-gray-600 dark:text-gray-200 border-b"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {item.data.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        {Object.values(row).map((value, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="py-3 px-6 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700"
                                            >
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

        </div>
    );
}