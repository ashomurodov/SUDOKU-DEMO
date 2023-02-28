const numberPad = document.querySelectorAll(".numberBox");
const sudukuBox = document.querySelectorAll("td");
const reloadBtn = document.querySelector(".reload");
let clickedNumber;
let randomNumbers = [];
// let clickedBox;

// & =========== section 1 ================== initialize ===========================

//  ! initialization !
// ^ get numbers for default boxes.
  for (let i = 0; i < 36; i++) {
    let rN = mathRandom(9);
    randomNumbers.push(rN);
  }
reload();

// & =================== section 2 ================== game logic =================

// getNumber when clicked
numberPad.forEach((number) => {
  number.addEventListener("click", () => {
    clickedNumber = number.textContent;
    sudukuBox.forEach((suduku) => {
      if (suduku.classList.contains("hasNotNumber")) {
        suduku.textContent = clickedNumber;
        removeAllClasses();
        addColorEcualBoxes(suduku);
      }
    });
  });
});

// add number when clicked sudoku box.
sudukuBox.forEach((box) => {
  // clickedBox = box;
  box.addEventListener("click", () => {
    removeAllClasses();

    addColorEcualBoxes(box);
    box.classList.add("active");
    if (!box.classList.contains("hasNumber")) {
      box.classList.add("hasNotNumber");
    }
  });
});

// & ================== section 3 =================== functions =================

// function for remove all active classes from the numberBox;
function removeAllClasses() {
  sudukuBox.forEach((suduku) => {
    suduku.classList.remove("active");
    suduku.classList.remove("hasNotNumber");
  });
}

// function for when click number or add number get background color same value boxes
function addColorEcualBoxes(box) {
  sudukuBox.forEach((suduku) => {
    if (suduku.textContent !== "" && box.textContent == suduku.textContent) {
      suduku.classList.add("active");
    }
  });
}

// function for create random numbers.
function mathRandom(number) {
  return Math.trunc(Math.random() * number) + 1;
}

// function for reload game
function reload() {
  sudukuBox.forEach((item) => {
    item.classList.remove("active");
    item.classList.remove("hasNumber");
    item.textContent = "";
  });

  randomNumbers.forEach((number) => {
    let randomBoxNumber = mathRandom(81);
    console.log(randomBoxNumber);
    document.querySelector(`.box-${randomBoxNumber}`).textContent = number;
    document
      .querySelector(`.box-${randomBoxNumber}`)
      .classList.add("hasNumber");
  });
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode > 48 && e.keyCode < 58) {
    clickedNumber = e.key;
    console.log(clickedNumber);
    sudukuBox.forEach((box) => {
      if (box.classList.contains("hasNotNumber")) {
        box.textContent = clickedNumber;
        removeAllClasses();
        addColorEcualBoxes(box);
      }
    });
  }
});

reloadBtn.addEventListener("click", reload);
