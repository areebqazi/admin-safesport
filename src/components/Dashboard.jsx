import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const usersData = [
  { "id": 1, "name": "John Doe", "email": "john.doe@example.com", "videoStatus": "Completed" },
  { "id": 2, "name": "Jane Smith", "email": "jane.smith@example.com", "videoStatus": "Pending" },
  { "id": 3, "name": "Michael Johnson", "email": "michael.johnson@example.com", "videoStatus": "In Progress" },
  { "id": 4, "name": "Emily Brown", "email": "emily.brown@example.com", "videoStatus": "Completed" },
  { "id": 5, "name": "David Lee", "email": "david.lee@example.com", "videoStatus": "Pending" },
  { "id": 6, "name": "Sarah Miller", "email": "sarah.miller@example.com", "videoStatus": "In Progress" },
  { "id": 7, "name": "Daniel Wilson", "email": "daniel.wilson@example.com", "videoStatus": "Completed" },
  { "id": 8, "name": "Olivia Davis", "email": "olivia.davis@example.com", "videoStatus": "Pending" },
  { "id": 9, "name": "James Martinez", "email": "james.martinez@example.com", "videoStatus": "In Progress" },
  { "id": 10, "name": "Sophia Garcia", "email": "sophia.garcia@example.com", "videoStatus": "Completed" },
  { "id": 11, "name": "Alexander Taylor", "email": "alexander.taylor@example.com", "videoStatus": "Pending" },
  { "id": 12, "name": "Isabella Rodriguez", "email": "isabella.rodriguez@example.com", "videoStatus": "In Progress" }
];

const UserTable = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9); // Change this number as needed

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
    // Filter through original usersData array
    const filteredUsers = usersData.filter(user =>
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.videoStatus.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
  };

  // Calculate index of the last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  // Calculate index of the first user on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Slice users array to display only users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Video Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.videoStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination in footer */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={users.length}
          pageSize={usersPerPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UserTable;
