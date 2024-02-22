"use client";

import axios from "axios";
import React, { useState } from "react";

interface User {
  id: number;
  mcId: string;
  isImportant: boolean;
}

const StartConvo = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setInputValue(e.target.value);

  const deleteUser = (id: any) =>
    setUsers(users.filter((user: { id: any }) => user.id !== id));

  const toggleImportance = (id: any) => {
    setUsers(
      users.map((user: User) =>
        user.id === id ? { ...user, isImportant: !user.isImportant } : user
      )
    );
  };

  const addUser = async () => {
    if (!inputValue.trim()) {
      setErrorMessage("Please enter a valid MC ID.");
      return;
    }

    try {
      const response = await axios.get(
        `https://playerdb.co/api/player/minecraft/${inputValue}`
      );
      console.log(response);
      if (response.data && response.data.success) {
        const newUser = {
          id: Date.now(),
          mcId: inputValue,
          isImportant: false,
        };
        setUsers([...users, newUser]);
        setInputValue("");
        setErrorMessage("");
      } else {
        setErrorMessage("The entered ID is not a valid Minecraft player ID.");
      }
    } catch (error) {
      setErrorMessage(
        "Failed to validate the Minecraft player ID. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full py-10 px-4 bg-bodydark1">
        <div className="p-4 bg-gray-200 rounded-3xl bg-bodydark">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Provide the MC ID of the user you want to add"
          />
          {errorMessage && (
            <div className="text-red-500 mb-2">{errorMessage}</div>
          )}
          <div className="flex justify-between">
            <button
              onClick={addUser}
              className="w-full p-2 mb-2 bg-blue-500 text-white rounded font-bold"
            >
              ADD USER
            </button>
          </div>
        </div>

        {/* Table structure for users */}
        <table className="min-w-full mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MC ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(
              (user: {
                id: React.Key | null | undefined;
                isImportant: any;
                mcId:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
              }) => (
                <tr
                  key={user.id}
                  className={`${user.isImportant ? "bg-red-400" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.mcId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleImportance(user.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StartConvo;
