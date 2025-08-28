document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  /* ---------------- FORMULÁRIO DE CADASTRO ---------------- */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');
    const emailInputs = signupForm.querySelectorAll('.email-validate');

    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      let valid = true;

      // Campos obrigatórios
      signupForm.querySelectorAll('input[required]').forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });

      // Confirma senha
      if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        valid = false;
      } else {
        confirmPassword.classList.remove('is-invalid');
      }

      // Valida emails
      emailInputs.forEach(input => {
        if (!emailRegex.test(input.value)) {
          input.classList.add('is-invalid');
          valid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (valid) {
        signupForm.submit(); // ou sua lógica de envio
      }

      signupForm.classList.add('was-validated');
    });
  }

  /* ---------------- FORMULÁRIO DE LOGIN ---------------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const loginEmail = loginForm.querySelector('.email-validate');

    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      let valid = true;

      loginForm.querySelectorAll('input[required]').forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (loginEmail && !emailRegex.test(loginEmail.value)) {
        loginEmail.classList.add('is-invalid');
        valid = false;
      } else if (loginEmail) {
        loginEmail.classList.remove('is-invalid');
      }

      if (valid) {
        loginForm.submit();
      }

      loginForm.classList.add('was-validated');
    });
  }

  /* ---------------- FORMULÁRIO "ESQUECI MINHA SENHA" ---------------- */
  const forgotForm = document.getElementById('forgotForm');
  const forgotEmail = document.getElementById('forgotEmail');
  const forgotSuccess = document.getElementById('forgotSuccess');

  if (forgotForm && forgotEmail) {
    forgotForm.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      let valid = true;

      if (!forgotEmail.value.trim() || !emailRegex.test(forgotEmail.value)) {
        forgotEmail.classList.add('is-invalid');
        valid = false;
      } else {
        forgotEmail.classList.remove('is-invalid');
      }

      if (valid) {
        forgotForm.classList.add("d-none");
        forgotSuccess.classList.remove("d-none");
      }

      forgotForm.classList.add('was-validated');
    });
  }

 
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
      } else {
        input.type = "password";
        btn.textContent = "👁️";
      }
    });
  });

});
