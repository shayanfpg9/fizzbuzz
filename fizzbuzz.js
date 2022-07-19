// variables
const $ = (
  qr,
  filter = (result) => {
    return result;
  }
) => {
  const select = document.querySelectorAll(qr),
    result =
      select.length > 0 ? (select.length == 1 ? select[0] : select) : undefined;

  if (typeof filter == "function") return filter(result);
};

let info = "",
  datas = {
    specials: [
      {
        number: 3,
        text: "fizz",
      },
      {
        number: 5,
        text: "buzz",
      },
    ],
    separator: "-",
    count: {
      form: 1,
      to: 10,
    },
  };

// functions
// (function recovery(data) {
//   if (data!=null) {
//     datas = data;
//     $("#start-number").value = data.count.from;
//     $("#final-number").value = data.count.to;
//     $("#separator").value = data.separator;
//   }
// })(localStorage.getItem("recovery"));

function FizzBuzz(char) {
  let result = [];
  datas.specials.forEach(({ number, text }) => {
    if (char % number == 0) {
      result.push(text);
    }
  });

  result = result.join(datas.separator);

  if (result.trim() != "") {
    return result + ` (${char})`;
  }
  return char;
}

function isNotSet(num) {
  datas.specials.forEach(({ number }) => {
    if (num == number) return false;
  });

  return true;
}

function addError(title, msg = "") {
  $(".error>h2").innerHTML = title + " :";
  $(".error>span").innerHTML = msg;
}

function setValues() {
  datas.count.form = $("#start-number").value;
  datas.count.to = $("#final-number").value;
  if (Number($("#separator").value)) {
    addError("invalid separator", "your separator is a number");
    return "";
  } else {
    datas.separator = $("#separator").value;
  }
}

function start() {
  console.clear();
  setInfo();
  setValues();
  let number = datas.count.form;
  while (number <= datas.count.to) {
    console.log(FizzBuzz(number));
    number++;
  }
}

function setInfo() {
  info = "";
  datas.specials.forEach(({ number, text }) => {
    info += `   number : ${number}    text : ${text}\n`;
  });

  console.log(`info:\n${info}`);
}

// codes

$("#advanced-settings").addEventListener("click", () => {
  const advanceSettings = $(".special-numbers", (el) => {
    return el[0] || el;
  });

  advanceSettings.classList.add("active");
  $("main").classList.add("blur");

  advanceSettings.innerHTML = "";

  datas.specials.forEach(({ number, text }, key) => {
    advanceSettings.innerHTML += `
    <li>
        <label for="spe-${key}-n">number :</label>
        <input type="number" id="spe-${key}-n" value="${number}">
        <br>
        <label for="spe-${key}-t">text :</label>
        <input type="text" id="spe-${key}-t" value="${text}">
        <br>
        <button type="button" class="advset-save" data-key="${key}" id="spe-${key}">save edits</button>
    </li>
    <br>
    <br>
    `;
  });

  advanceSettings.innerHTML += `
  <button type="button" id="addspenum">add special number</button>
  <br>
  <button class='cls'>close</button> 
  `;

  $("#addspenum").addEventListener("click", () => {
    const number = prompt("write one new number"),
      text = prompt(
        "add one text (show when number is divisible by your number)"
      );

    if (isNotSet(+number) && Number(number)) {
      datas.specials.push({
        number: +number,
        text: text,
      });

      $("#advanced-settings").click();
    } else if (!isNotSet(+number)) {
      addError(
        "Duplicate data",
        "we have this number before for edit number text please edit with edit tab"
      );
    } else {
      addError("invalid data", "your input data isn't number");
    }
  });

  $(".advset-save").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.id,
        number = $(`#${id}-n`, (el) => {
          return el[0] || el;
        }).value,
        text = $(`#${id}-t`, (el) => {
          return el[0] || el;
        }).value,
        index = datas.specials[+btn.getAttribute("data-key")];

      index.number = number;
      index.text = text;
    });
  });

  $(".cls").addEventListener("click", () => {
    advanceSettings.innerHTML = "";
    advanceSettings.classList.remove("active");
    $("main").classList.remove("blur");
  });
});

$(".start").addEventListener("click", (e) => {
  start();
});

// $(".save").addEventListener("click",()=>{
//   setValues()
//   localStorage.setItem("recovery",datas)
// })
