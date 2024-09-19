const emptyHeader = '<tr><td colspan="3">Нет данных</td></tr>';
let currentStorage = {}; 

function updateTable() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = ''; 

    currentStorage = getStorage(); 
    const keys = Object.keys(currentStorage);
    
    if (keys.length === 0) {
        tbody.innerHTML = emptyHeader;
    } else {
        keys.forEach(key => {
            const value = currentStorage[key];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${key}</td>
                <td>${value}</td>
                <td><span style="color:red;" onclick="deleteItem('${key}')">X</span></td>
            `;
            tbody.appendChild(row);
        });
    }
}

window.onload = function() {
    updateTable();
};


function getStorage() {
    const data = localStorage.getItem('myData');
    return data ? JSON.parse(data) : {};
}

function saveItem(key, value) {
    currentStorage[key] = value;
    localStorage.setItem('myData', JSON.stringify(currentStorage));
    updateTable();
}

saveItem('key 1', 'Значение 1');
saveItem('key 2', 'Значение 2');
saveItem('key 3', 'Значение3');

function deleteItem(key) {
    if (confirm("Вы уверены, что хотите удалить эту запись?")) {
        delete currentStorage[key];
        localStorage.setItem('myData', JSON.stringify(currentStorage));
        updateTable();
    }
}

function clearStorage() {
    if (confirm("Вы уверены, что хотите полностью очистить локальное хранилище?")) {
        localStorage.removeItem('myData');
        currentStorage = {}; 
        updateTable();
    }
}
