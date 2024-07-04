import React, { useEffect, useState } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { API } from '../constants';
import axios from 'axios';
import * as XLSX from 'xlsx';

const UserTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState(usersData);
  const user = localStorage.getItem("user");
  const userr = JSON.parse(user);
  const accessToken = userr?.user?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send accessToken in the Authorization header
          },
        });
        setUsersData(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, [accessToken]);

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

  const handleDownloadExcel = () => {
    const dataToExport = users.map(user => ({
      "Name": user.name,
      "Email": user.email,
      "Sport": user.sport,
      "Video Status": user.videoStatus.filter(video => video.unlocked).length
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersData.xlsx");
  };

  // Calculate index of the last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  // Calculate index of the first user on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Slice users array to display only users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  console.log(currentUsers,"currentUsers");

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, email"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          onClick={handleDownloadExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Download Excel
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">S.NO</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Sport</th>
            <th className="py-3 px-6 text-left">Video Status</th>
            {/* <th className="py-3 px-6 text-left">Certificate</th> */}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{indexOfFirstUser + index + 1}</td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.sport}</td>
              <td className="py-3 px-6 text-left">{user.videoStatus.filter(video => video.unlocked).length}</td>
              {/* <td className="py-3 px-6 text-left">Download</td> */}
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
