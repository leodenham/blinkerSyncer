const syncButton = document.getElementById("sync");
const body = document.getElementById("body");
let isOn = false;
let currentDate = new Date();
let timeoutId = undefined;
let t = 0.6;

const flipColor = () => {
  if (isOn) {
    isOn = false;
    body.style.backgroundColor = "#09090e";
    document.documentElement.style.setProperty("--text", "#f0f0f0");
  } else {
    isOn = true;
    body.style.backgroundColor = "#f5c701";
    document.documentElement.style.setProperty("--text", "#09090e");
  }
};

function updateTValue(value) {
  t = parseFloat(value);
}
const addSync = () => {
  flipColor();
  let currentDate = new Date();
  const currentMillis = currentDate.getMilliseconds();

  const flip0 = 500;
  const flip1 = isOn ? 500 - currentMillis : 1000 - currentMillis;

  const nextFlip = flip0 * (1 - t) + flip1 * t;

  timeoutId = setTimeout(addSync, nextFlip);
};

const removeSync = () => {
  clearTimeout(timeoutId);
  syncButton.onclick = startSync;
  syncButton.innerText = "Turn on";
  if (isOn) {
    flipColor();
  }
};

const startSync = () => {
  syncButton.onclick = removeSync;
  syncButton.innerText = "Turn off";
  addSync();
};
syncButton.onclick = startSync;
