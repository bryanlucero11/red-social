document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
        document.getElementById('user-info').innerHTML = `
<p><strong>Nombre:</strong> ${user.firstName} ${user.lastName}</p>
<p><strong>Email:</strong> ${user.email}</p>
<p><strong>Fecha de Nacimiento:</strong> ${user.dob}</p>
<p><strong>Pais:</strong> ${user.pais}</p>
<p><strong>Ciudad:</strong> ${user.ciudad}</p>
<p><strong>Estado:</strong> ${user.status}</p>
`;


    }
});

function blockPost(postId) {
    const postStatus = document.querySelector(`#PostStatus${postId}`);
    const blockButton = document.querySelector(`#tr${postId} button`);
    const trID = document.querySelector(`#tr${postId}`)
    console.log(postStatus)
    console.log(blockButton)

    if (postStatus.innerText === 'Activo') {
        if (confirm('¿Estás seguro de que deseas bloquear esta publicacion?')) {
            postStatus.innerText = 'Bloqueado';
            blockButton.innerText = 'Desbloquear';
            trID.classList.add('user-blocked')
            alert('Publicacion bloqueada.');
        }
    } else {
        if (confirm('¿Estás seguro de que deseas desbloquear esta publicacion?')) {
            postStatus.innerText = 'Activo';
            blockButton.innerText = 'Bloquear';
            trID.classList.remove('user-blocked')
            alert('Publicacion desbloqueada.');
        }

    }
}