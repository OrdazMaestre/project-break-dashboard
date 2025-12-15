/*
Creador de contraseñas seguras
  - `Math.random()` Para generar aleatoriedad
  - array Mayúsculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  - array Minúsculas: "abcdefghijklmnopqrstuvwxyz"
  - array Números: "0123456789"
  - array Símbolos "!@#$%^&*()-_=+"
  - de 12 a 50 caracteres
  - Guarda cada uno de los datos (mayúsculas, minúsculas, símbolos y núemeros) en una variable para poder recorrerlos.
  - Usa bucles y condicionales para que siempre haya al menos uno de cada array
*/

/* ========== PASSWORD GENERATOR ========== */

// Arrays base
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+";

// Guardamos cada grupo en un array
const charGroups = [
  UPPERCASE,
  LOWERCASE,
  NUMBERS,
  SYMBOLS
];

// Generar un carácter aleatorio de un string
function randomChar(group) {
  const index = Math.floor(Math.random() * group.length);
  return group[index];
}

// Función principal
function generatePassword(length) {
  let password = [];

  // 1️⃣ Garantizar al menos uno de cada grupo
  for (let i = 0; i < charGroups.length; i++) {
    password.push(randomChar(charGroups[i]));
  }

  // 2️⃣ Rellenar hasta la longitud deseada
  for (let i = password.length; i < length; i++) {
    const randomGroup =
      charGroups[Math.floor(Math.random() * charGroups.length)];
    password.push(randomChar(randomGroup));
  }

  // 3️⃣ Mezclar la contraseña (Fisher-Yates)
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}


const lengthInput = document.getElementById("length-input");
const output = document.getElementById("password-output");
const generateBtn = document.getElementById("generate-btn");

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    const length = Number(lengthInput.value);
    if (length < 12 || length > 50) return;

    const password = generatePassword(length);
    output.textContent = password;
  });
}

// Funcionalidad del widget
const preview = document.getElementById("password-preview");
const widgetBtn = document.getElementById("generate-password-btn");

if (widgetBtn && preview) {
  widgetBtn.addEventListener("click", e => {
    e.preventDefault(); // evita ir a password.html
    const pwd = generatePassword(16);
    preview.textContent = pwd;
  });
}
