import { useState } from 'react';
import Adduser from './components/Adduser';
import Chatview from './components/Chatview';

function App() {

  const [user, setUser] = useState({ name: "" });
  const [open, setOpen] = useState(false);

  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleAddUser = () => {
    setUser({ ...user, id: user.name + Date.now() });
    setOpen(true);
  };

  return (
    <>
      {!open ? (
        <div>
          <Adduser handleNameChange={handleNameChange} handleAddUser={handleAddUser} user={user}/>
        </div>
      ) : (
        <div>
          <Chatview user={user}/>
        </div>
      )}
    </>
  )
}

export default App
