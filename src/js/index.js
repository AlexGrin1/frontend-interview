import "../styles/style.scss";

const onDomLoaded = () => {
  const form = document.getElementById("taskForm");
  const inputNodeList = getInputElementsFromForm(form);
  restoreProgressFromStorage(inputNodeList);
  handleTaskProgress();
  form.addEventListener("change", () => {
    saveProgressToStorage(inputNodeList);
    handleTaskProgress();
  });
};

/**
 * @param {Node} form
 * @return {NodeList}
 */
const getInputElementsFromForm = (form) => {
  return form.querySelectorAll('input[type="checkbox"]');
};

/**
 * @param {NodeList} inputNodeList
 */
const saveProgressToStorage = (inputNodeList) => {
  const progressData = [].map.call(inputNodeList, (node) => node.checked);
  localStorage.setItem("progress", JSON.stringify(progressData));
};

/**
 * @param {NodeList} inputNodeList
 */
const restoreProgressFromStorage = (inputNodeList) => {
  const progressData = JSON.parse(localStorage.getItem("progress")) || [];
  if (progressData.length === inputNodeList.length) {
    progressData.forEach((isChecked, id) => {
      inputNodeList[id].checked = isChecked;
    });
  }
};

/**
 * Displays a message if the process is complete
 */
const handleTaskProgress = () => {
  const progressData = JSON.parse(localStorage.getItem("progress")) || [];
  const progress = progressData.filter((bool) => bool);
  document.getElementById("taskDone").textContent =
    progressData.length && progressData.length === progress.length
      ? "Готово? Чего же вы ждёте? Скорее отправляйте нам результат! Удачи:)"
      : "";
};

document.addEventListener("DOMContentLoaded", onDomLoaded);

function ValidPhone() {
  const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  const myPhone = document.getElementById("telNumber").value;
  const valid = re.test(myPhone);
  return valid;
}

let myButton = document.querySelector("input[type='submit'");
myButton.addEventListener("click", function (ev) {
  if (ValidPhone()) {
    ev.preventDefault();
    let name = document.getElementById("telNumber").value;
    let obj = {
      name: name,
    };
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: obj,
    })
      .then((data) => {
        if (data.status == "200") {
          const myPhone = document.getElementById("telNumber");
          const mydiv = document.getElementById("response");
          mydiv.innerHTML = "Номер успешно отправлен";
          myPhone.value = "";
          setTimeout(() => {
            mydiv.innerHTML = "";
          }, 2000);
        }
      })
      .catch(alert);
  } else {
    ev.preventDefault();
    let mydiv = document.getElementById("response");
    mydiv.innerHTML = "Неверный ввод. Формат: +375293333333";
    setTimeout(() => {
      mydiv.innerHTML = "";
    }, 2000);
  }
});
