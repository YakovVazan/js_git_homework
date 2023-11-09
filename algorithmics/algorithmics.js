document.addEventListener("DOMContentLoaded", () => {
  // palindrome area
  let textField = document.querySelector("#string-input");
  let checkButton = document.querySelector("#check-button");

  checkButton.addEventListener("click", () => {
    let value = textField.value;
    if (isPalindrome(value)) {
      textField.style.backgroundColor = "green";
    } else {
      textField.style.backgroundColor = "red";
    }
  });

  // encryption area
  let text = "";
  let steps = 0;

  // encryption
  document.querySelector("#encrypt").addEventListener("click", () => {
    text = document.querySelector("#text-to-encrypt").value;
    steps = document.querySelector("#steps-to-encrypt").value;

    document.querySelector("#text-to-encrypt").value = encryption(
      text,
      Number(steps)
    );
  });

  // decryption
  document.querySelector("#decrypt").addEventListener("click", () => {
    document.querySelector("#text-to-encrypt").value = text;
  });
});

function isPalindrome(text) {
  return text === text.toLowerCase().split("").reverse().join("");
}

function encryption(str, shift) {
  let encryptedStr = [];
  shift %= 26;
  for (let i = 0; i < str.length; i++) {
    let aschiiCode = str[i].charCodeAt(0);

    // Capital letter
    if (aschiiCode >= 65 && aschiiCode <= 90) {
      aschiiCode += shift;
      if (aschiiCode > 90) aschiiCode -= 26;
      // Small letter
    } else if (aschiiCode >= 97 && aschiiCode <= 122) {
      aschiiCode += shift;
      if (aschiiCode > 122) aschiiCode -= 26;
    }
    encryptedStr.push(String.fromCharCode(aschiiCode));
  }

  return encryptedStr.join("");
}
