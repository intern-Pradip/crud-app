document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userData');
    const tbody = document.querySelector('tbody');
    let editId = null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const contact = document.getElementById('contact').value;

        const formData = {
            id: editId || uuid.v4(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            contact: contact
        };

        StoreData(formData);
        initialState();
        tableData();
    };

    const initialState = () => {
        document.getElementById('firstName').value = "";
        document.getElementById('lastName').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('contact').value = "";
        editId = null;
    };

    const StoreData = (formData) => {
        const data = JSON.parse(localStorage.getItem('userData')) || [];

        const index = data.findIndex(item => item.id === formData.id);
        if (index > -1) {
            data[index] = formData;
        } else {
            data.push(formData);
        }
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const tableData = () => {
        const data = JSON.parse(localStorage.getItem('userData')) || [];
        tbody.innerHTML = data.map((item, index) =>
            `<tr id="${item.id}">
                <td>${index + 1}</td>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.contact}</td>
                <td><button class='edit'>Edit</button></td>
                <td><button class='delete'>Delete</button></td>
            </tr>`
        ).join('');

        document.querySelectorAll('.edit').forEach(button => button.addEventListener('click', handleEdit));
        document.querySelectorAll('.delete').forEach(button => button.addEventListener('click', handleDelete));
    };

    function handleDelete(e) {
        const row = e.target.closest('tr');
        const id = row.getAttribute('id');
        let userData = JSON.parse(localStorage.getItem('userData')) || [];
        userData = userData.filter(item => item.id !== id);
        localStorage.setItem('userData', JSON.stringify(userData));
        tableData();
    }

    function handleEdit(e) {
        const row = e.target.closest('tr');
        const id = row.getAttribute('id');
        let userData = JSON.parse(localStorage.getItem('userData')) || [];
        let item = userData.find((item) => item.id === id);
        if (item) {
            document.getElementById('firstName').value = item.firstName;
            document.getElementById('lastName').value = item.lastName;
            document.getElementById('email').value = item.email;
            document.getElementById('contact').value = item.contact;
            editId = item.id;
        }
    }

    form.addEventListener('submit', handleSubmit);
    tableData();
});
