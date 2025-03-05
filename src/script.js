document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputText");
  const method = document.getElementById("method");
  const outputText = document.getElementById("outputText");
  const encryptBtn = document.getElementById("encryptBtn");
  const decryptBtn = document.getElementById("decryptBtn");

  

  encryptBtn.addEventListener("click", function () {
    const text = inputText.value;
    const selectedMethod = method.value;
    outputText.value = encrypt(text, selectedMethod);
  });

  decryptBtn.addEventListener("click", function () {
    const text = outputText.value;
    const selectedMethod = method.value;
    outputText.value = decrypt(text, selectedMethod);
  });

  function encrypt(text, method) {
    switch (method) {
      case "substitution":
        return text
          .split("")
          .map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
          .join("");
      case "transposition":
        return text.split("").reverse().join("");
      case "multi-alphabet":
        return vigenereCipher(text, "KEY", true);
      default:
        return text;
    }
  }

  function decrypt(text, method) {
    switch (method) {
      case "substitution":
        return text
          .split("")
          .map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
          .join("");
      case "transposition":
        return text.split("").reverse().join("");
      case "multi-alphabet":
        return vigenereCipher(text, "KEY", false);
      default:
        return text;
    }
  }

  function vigenereCipher(text, key, encrypting) {
    let result = "";
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let shift = key.charCodeAt(keyIndex % key.length) - 65;
      if (!encrypting) shift = -shift;
      result += String.fromCharCode(charCode + shift);
      keyIndex++;
    }
    return result;
  }
});