// Array para almacenar los usuarios
let users = [];

// Función para agregar o actualizar usuario
function addOrUpdateUser() {
    const name = document.getElementById("name").value;
    const cedula = document.getElementById("cedula").value;
    const edad = document.getElementById("edad").value;
    const celular = document.getElementById("celular").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const ciudad = document.getElementById("ciudad").value;
    const departamento = document.getElementById("departamento").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const foto = document.getElementById("foto").files[0];

    if (!name || !cedula || !edad || !celular || !email || !ciudad || !departamento || !fechaNacimiento || !foto) {
        alert("Todos los campos obligatorios deben ser completados.");
        return;
    }

    // Validar que la cédula sea única
    const existingUserIndex = users.findIndex(user => user.cedula === cedula);
    if (existingUserIndex !== -1) {
        // Actualizar usuario
        users[existingUserIndex] = { name, cedula, edad, celular, telefono, email, ciudad, departamento, fechaNacimiento, foto: URL.createObjectURL(foto) };
    } else {
        // Agregar nuevo usuario
        users.push({ name, cedula, edad, celular, telefono, email, ciudad, departamento, fechaNacimiento, foto: URL.createObjectURL(foto) });
    }

    // Limpiar formulario y refrescar tabla
    document.getElementById("userForm").reset();
    displayUsers();
}

// Función para mostrar usuarios en la tabla
function displayUsers(filteredUsers = users) {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";
    filteredUsers.forEach(user => {
        userTable.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.cedula}</td>
                <td>${user.edad}</td>
                <td>${user.celular}</td>
                <td>${user.telefono || ''}</td>
                <td>${user.email}</td>
                <td>${user.ciudad}</td>
                <td>${user.departamento}</td>
                <td>${user.fechaNacimiento}</td>
                <td><img src="${user.foto}" alt="Foto"></td>
                <td>
                    <button onclick="editUser('${user.cedula}')">Editar</button>
                    <button onclick="deleteUser('${user.cedula}')">Borrar</button>
                </td>
            </tr>
        `;
    });
}

// Función para editar usuario
function editUser(cedula) {
    const user = users.find(u => u.cedula === cedula);
    document.getElementById("name").value = user.name;
    document.getElementById("cedula").value = user.cedula;
    document.getElementById("edad").value = user.edad;
    document.getElementById("celular").value = user.celular;
    document.getElementById("telefono").value = user.telefono;
    document.getElementById("email").value = user.email;
    document.getElementById("ciudad").value = user.ciudad;
    document.getElementById("departamento").value = user.departamento;
    document.getElementById("fechaNacimiento").value = user.fechaNacimiento;
}

// Función para borrar usuario
function deleteUser(cedula) {
    users = users.filter(user => user.cedula !== cedula);
    displayUsers();
}

// Función para buscar usuario por cédula
function searchUserByCedula() {
    const cedula = document.getElementById("searchCedula").value;
    const filteredUsers = users.filter(user => user.cedula === cedula);
    displayUsers(filteredUsers);
}

// Función para buscar usuario por nombre
function searchUserByName() {
    const name = document.getElementById("searchName").value;
    const filteredUsers = users.filter(user => user.name.toLowerCase() === name.toLowerCase());
    displayUsers(filteredUsers);
}

// Función para filtrar usuarios por ciudad y departamento
function filterUsers() {
    const ciudad = document.getElementById("filterCiudad").value;
    const departamento = document.getElementById("filterDepartamento").value;

    const filteredUsers = users.filter(user => {
        return (ciudad === "" || user.ciudad === ciudad) &&
               (departamento === "" || user.departamento === departamento);
    });

    displayUsers(filteredUsers);
}
