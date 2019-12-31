function parseJson(path) {
  var request = new XMLHttpRequest();
  request.open("GET", path, false);
  request.send(null);
  var jsonData = JSON.parse(request.responseText);
  return jsonData;
}

function index() {
  let survey = parseJson("/survey.json");
  Tabletop.init({
    key: "1aCBnUeeqfjmTkltpzLsR0VHXExKRGPfFt4utQRSNA_A",
    callback: function(data, tabletop) {
      const awardsContainer = document.querySelector("#awardsContainer");
      for (let i = 0; i < data.length; i++) {
        if (data[i].CanVote !== "FALSE") {
          let stringI = i.toString();
          console.log(stringI);
          let question = `<h3 class="question">Award ${data[i].VoteNumber}: ${survey[stringI].question}</h3>`;
          let button =
            data[i].HasFinished !== "TRUE"
              ? `<a href="/vote-${i}.html" class="button">VOTE NOW</a>`
              : "<span>WINNER: <strong class='winner'>JAMES LANZON</strong></span>";
          awardsContainer.innerHTML =
            awardsContainer.innerHTML + question + button;
        }
      }
    },
    simpleSheet: true
  });
}

function vote(i) {
  let survey = parseJson("/survey.json");
  Tabletop.init({
    key: "1aCBnUeeqfjmTkltpzLsR0VHXExKRGPfFt4utQRSNA_A",
    callback: function(data, tabletop) {
      const awardsContainer = document.querySelector("#awardsContainer");
      const header = document.querySelector("#headline");
      if (data[i].CanVote !== "FALSE") {
        let stringI = i.toString();
        header.innerHTML = survey[stringI].question;

        for (let j = 0; j < survey[i].choices.length; j++) {
          const radioOption = `<input type="radio" name="choices" value="c-${j}" id="c-${j}"/><label for="c-${j}">${survey[i].choices[j]}</label><br><br>`;
          awardsContainer.innerHTML = awardsContainer.innerHTML + radioOption;
        }
      }
    },
    simpleSheet: true
  });
}

function radio_toolbar_click(ev) {
  let checked = document.querySelector('input[name="radioFruit"]:checked');
  if (checked) {
    checked.checked = false;
  }
  ev.target.previousElementSibling.checked = true;
}
