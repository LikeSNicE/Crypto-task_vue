<script setup>
import { ref } from "vue";

const inputText = ref("");
const outputText = ref("");
const method = ref("substitution");

const encrypt = (text, selectedMethod) => {
  switch (selectedMethod) {
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
};

const decrypt = (text, selectedMethod) => {
  switch (selectedMethod) {
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
};

const vigenereCipher = (text, key, encrypting) => {
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
};

const encryptText = () => {
  outputText.value = encrypt(inputText.value, method.value);
};

const decryptText = () => {
  outputText.value = decrypt(outputText.value, method.value);
};
</script>

<template>
  <div>
    <h2 class="text-4xl text-center font-bold my-2">Шифрование Текста</h2>

    <textarea
      v-model="inputText"
      placeholder="Введите текст..."
      class="block text-center w-4/5 ml-auto mr-auto mt-[50px] h-[100px] resize-none border rounded-[15px]"
    ></textarea>

    <select
      v-model="method"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-blue-500 focus:border-blue-500 w-1/5 p-2.5 text-center ml-auto mr-auto my-[30px]"
    >
      <option value="substitution">Подстановка</option>
      <option value="transposition">Перестановка</option>
      <option value="multi-alphabet">Многоалфавитный</option>
    </select>

    <div class="flex justify-center">
      <button
        @click="encryptText"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Зашифровать
      </button>
      <button
        @click="decryptText"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Дешифровать
      </button>
    </div>

    <textarea
      v-model="outputText"
      placeholder="Результат..."
      class="block text-center w-4/5 ml-auto mr-auto mt-[50px] h-[100px] resize-none border rounded-[15px]"
      readonly
    ></textarea>
  </div>
</template>
