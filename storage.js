const CACHE_KEY = "calculation_history";

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  if (checkForStorage()) {
    let historyData = JSON.parse(localStorage.getItem(CACHE_KEY)) || [];

    historyData.unshift(data);

    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

function showHistory() {
  return checkForStorage()
    ? JSON.parse(localStorage.getItem(CACHE_KEY)) || []
    : [];
}

function renderHistory() {
  const historyData = showHistory();
  const historyList = document.querySelector("#historyList");
  historyList.innerHTML = "";

  historyData.forEach((history) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${history.firstNumber}</td>
      <td>${history.operator}</td>
      <td>${history.secondNumber}</td>
      <td>${history.result}</td>
    `;
    historyList.appendChild(row);
  });
}

renderHistory();
