document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (username && email && password) {
      if (passwordRegex.test(password)) {
          document.getElementById('message').textContent = 'Signup Successful!';
          document.getElementById('message').style.color = 'green';
      } else {
          document.getElementById('message').textContent = 'Password must contain one uppercase, one number & one special character.';
          document.getElementById('message').style.color = 'red';
      }
  } else {
      document.getElementById('message').textContent = 'Please fill out all fields!';
      document.getElementById('message').style.color = 'red';
  }
});


// function togglePassword() {
//   const passwordField = document.getElementById('password');
//   if (passwordField.type === 'password') {
//       passwordField.type = 'text';
//   } else {
//       passwordField.type = 'password';
//   }
// }



const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
});