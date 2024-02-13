import React from 'react'

const Adduser = ({handleAddUser, handleNameChange, user}) => {
  return (
    <div className="fixed top-0 left-0 bg-[#00000084] w-full h-screen flex items-center justify-center">
          <div className="w-[300px] bg-white rounded p-2 flex flex-col gap-[10px]">
            <p>Enter your name</p>
            <input
              type="text"
              className="border border-[blue]"
              value={user?.name}
              onChange={handleNameChange}
              placeholder="Enter name"
            />
            <button
              className="w-fit self-end bg-[blue] text-white p-2 rounded"
              onClick={handleAddUser}
            >
              Join Chat Room
            </button>
          </div>
        </div>
  )
}

export default Adduser;