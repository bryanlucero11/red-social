function loadUsersFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    document.getElementById("connected-users").textContent = users.length+5;
    const userTableBody = document.querySelector("#users tbody");

    users.forEach(user => {
        const row = document.createElement('tr');
        if (user.status == "Bloqueado") {
            row.classList.add("user-blocked")
        }
        row.innerHTML = `
  <td>${user.id+5}</td>
  <td>${user.firstName} ${user.lastName}</td>
  <td>${user.email}</td>
  <td>${user.dob}</td>
  <td>${user.pais}</td> <!-- Puedes modificar esto según sea necesario -->
  <td>${user.ciudad}</td> <!-- Puedes modificar esto según sea necesario -->
  <td>${user.status}</td>
`;
        userTableBody.appendChild(row);
    });
}

window.onload = function () {
    loadUsersFromLocalStorage();
};