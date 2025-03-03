let arrayUsuarios
    document.addEventListener("DOMContentLoaded", function () {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.forEach(user => addUserToTable(user));
    });

    function confirmAction(action, userId) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) return;
      const user = users[userIndex];

      if (action === 'borrar') {
        if (confirm('¿Estás seguro de que deseas borrar este usuario?')) {
          users.splice(userIndex, 1);

          users.forEach((user, index) => {
            user.id = index + 1; 
          });
          localStorage.setItem('users', JSON.stringify(users));
          updateTable(users);
          alert('Usuario ' + userId + ' borrado.');
        }
      } else if (action === 'bloquear') {
        if (confirm('¿Estás seguro de que deseas bloquear este usuario?')) {
          user.status = 'Bloqueado';
          btnBloquear.textContent = "Desbloquear"
          users[userIndex] = user;
          localStorage.setItem('users', JSON.stringify(users));

          document.getElementById('users').innerHTML = '';
          users.forEach(user => addUserToTable(user));
          alert('Usuario ' + userId + ' bloqueado.');
        }
      } else if (action === 'desbloquear') {
        if (confirm('¿Estás seguro de que deseas desbloquear este usuario?')) {
          user.status = 'Activo';
          btnBloquear.textContent = "Bloquear"
          users[userIndex] = user;
          localStorage.setItem('users', JSON.stringify(users));

          document.getElementById('users').innerHTML = '';
          users.forEach(user => addUserToTable(user));
          alert('Usuario ' + userId + ' desbloqueado.');
        }
      }
    }

    function viewPosts(userId) {
      alert('Ver publicaciones de usuario ' + userId);
    }


    document.getElementById("addUserForm").addEventListener("submit", function (e) {
      e.preventDefault(); 

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const dob = document.getElementById("dob").value;
      const pais = document.getElementById("pais").value;
      const ciudad = document.getElementById("ciudad").value;
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

      const newUser = {
        id: newUserId,
        firstName,
        lastName,
        email,
        dob,
        pais,
        ciudad,
        password,
        status: 'Activo',
        posts: [
          {
            "id": "",
            "title": "",
            "content": "",
            "img": "",
            "fecha": ""
          },
        ] 
      };

        users.push(newUser);
        arrayUsuarios = users

      localStorage.setItem('users', JSON.stringify(users));

        document.getElementById("addUserForm").reset();

        alert('Usuario añadido correctamente.');

      addUserToTable(newUser);
      });

    function addUserToTable(user) {
      const usersTableBody = document.getElementById("users");
      console.log(usersTableBody)
      usersTableBody.style.backgroundColor = 'red'

      const newRow = document.createElement('tr');

      if (user.status === 'Bloqueado') {
        console.log('Usuario bloqueado:', user); 
        newRow.classList.add('user-blocked');
      }

      newRow.innerHTML = `
    <td>${user.id}</td>
    <td>${user.firstName} ${user.lastName}</td>
    <td>${user.email}</td>
    <td>${user.status}</td>
    <td>
      <button class="btn btn-editar btn-sm" data-bs-toggle="modal" data-bs-target="#editUserModal" onclick="editUser(${user.id})">Editar</button>
      <button class="btn btn-borrar btn-sm" onclick="confirmAction('borrar', ${user.id})">Borrar</button>
      <button class="btn btn-bloquear btn-sm" id="btnBloquear" onclick="confirmAction('${user.status === 'Activo' ? 'bloquear' : 'desbloquear'}', ${user.id})">
        ${user.status === 'Activo' ? 'Bloquear' : 'Desbloquear'}
      </button>
    </td>
    <td>
      <a href="./usuario.html" class="btn btn-visualizar btn-sm" onclick="saveUserData(${user.id})">Visualizar</a>
    </td>
  `;

      usersTableBody.appendChild(newRow);
    }

    function editUser(userId) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.id === userId);

      if (user) {
        document.querySelector("#editUserForm #firstName").value = user.firstName;
        document.querySelector("#editUserForm #lastName").value = user.lastName;
        document.querySelector("#editUserForm #email").value = user.email;
        document.querySelector("#editUserForm #dob").value = user.dob;
        document.querySelector("#editUserForm #pais").value = user.pais;
        document.querySelector("#editUserForm #ciudad").value = user.ciudad;
        document.querySelector("#editUserForm #password").value = user.password;
        document.querySelector("#editUserForm #confirmPassword").value = user.password;

        document.getElementById("editUserForm").onsubmit = function (e) {
          e.preventDefault(); 

          user.firstName = document.querySelector("#editUserForm #firstName").value;
          user.lastName = document.querySelector("#editUserForm #lastName").value;
          user.email = document.querySelector("#editUserForm #email").value;
          user.dob = document.querySelector("#editUserForm #dob").value;
          user.pais = document.querySelector("#editUserForm #pais").value;
          user.ciudad = document.querySelector("#editUserForm #ciudad").value;
          user.password = document.querySelector("#editUserForm #password").value;

          const updatedUsers = users.map(u => u.id === userId ? user : u);
          localStorage.setItem('users', JSON.stringify(updatedUsers));

          document.getElementById("editUserForm").reset();

          updateTable(updatedUsers);
        };
      }
    }

    function updateTable(users) {
      document.getElementById('users').innerHTML = '';
      users.forEach(user => addUserToTable(user));
    }

    function saveUserData(userId) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.id === userId);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }
