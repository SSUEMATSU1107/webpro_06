// public/janken.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const handInput = form.querySelector('input[name="hand"]');
  
    // 元のテキストボックスを消してラジオボタンを追加
    handInput.outerHTML = `
      <input type="radio" name="hand" id="gu" value="グー" required>
      <label for="gu">グー</label><br>
      <input type="radio" name="hand" id="choki" value="チョキ">
      <label for="choki">チョキ</label><br>
      <input type="radio" name="hand" id="pa" value="パー">
      <label for="pa">パー</label><br>
    `;
  });
  