export const registerUser = (username, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const existingUser = registeredUsers.find(user => user.username === username);
    if (existingUser) {
        return false;
    }
    registeredUsers.push({ username, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    return true;
};

export const registerTestUser = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const username = 'qwerty';
    const existingUser = registeredUsers.find(user => user.username === username);
    if (!existingUser) {
        const password = '12345!';
        registeredUsers.push({ username, password });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
};

export const checkUserExistence = (username, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const existingUser = registeredUsers.find(user => user.username === username);
    if (existingUser) {
        if (existingUser.password === password) {
            return username;
        }
    }
};

export const writeRecord = (username, time, dimension, moves) => {
    let records = JSON.parse(localStorage.getItem('records')) || [];
    const userRecordIndex = records.findIndex(item => item.username === username && item.dimension === dimension);
    if (userRecordIndex !== -1) {
        const userRecord = records[userRecordIndex];
        if ((time < userRecord.time && moves >= userRecord.moves) || (time === userRecord.time && moves < userRecord.moves)) {
            records[userRecordIndex] = { username, time, dimension, moves };
        }
    } else {
        records.push({ username, time, dimension, moves });
    }
    localStorage.setItem('records', JSON.stringify(records));
};