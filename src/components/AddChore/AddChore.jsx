import './AddChore.css'
import { useState } from 'react';

function AddChore() {
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignee, setAssignee] = useState('');

    // const addChore = async (e) => {
    //     e.preventDefault();

    //     const newChore = {
    //         name, 
    //         dueDate,
    //         assignee
    //     };

    //     const response = await
    // };

    return (
        <div>
            <h2>Add a Chore</h2>
            <form>
                <label>
                    Name:
                    <input value={name} />
                </label>
                <label>
                    Due:
                    <input value={dueDate} />
                </label>
                <label>
                    Assignee:
                    <input value={assignee} />
                </label>
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddChore;