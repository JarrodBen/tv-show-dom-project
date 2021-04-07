//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  addOptions(allEpisodes)
  let episodeSelect = document.getElementById("select")
  episodeSelect.addEventListener("change", function(x){
    x.preventDefault();

    let episodeSelected = episodeSelect.value;
    let input = episodeSelected.slice(9, episodeSelected.length)
    console.log(input)
    let episodeDisplay = allEpisodes.filter(element => {
      if(element.name.includes(input)) {
        return element;
      }
    })
    makePageForEpisodes(episodeDisplay)
  })

  document.getElementById("allEpisodes").textContent = allEpisodes.length

  let text = document.getElementById("searchText")
  text.addEventListener("input", function(x) {
    x.preventDefault()
    let searchValue = text.value;
    let search = searchValue.toLowerCase();
    let results = allEpisodes.filter(element => {
      if (element.name.toLowerCase().match(search) || element.summary.toLowerCase().match(search)) {
        return element
      }
    })
    makePageForEpisodes(results)
  })
}


function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = " ";

  episodeList.forEach(element => {
    let epGroup = document.createElement("div")
    let header = document.createElement("h3");
    let medImg = document.createElement("img")
    medImg.setAttribute("src", `${element.image.medium}`)
    let sumText = document.createElement("p")
    let remHTML = element.summary;
    let removeHTML = remHTML.replace(/<\/?[^>]+(>|$)/g, "")
    let epName = document.createTextNode(`${element.name}`)
    let seasonNum = document.createTextNode(` - S0${element.season}`)
    let epNum = document.createTextNode(`E0${element.number}`)
    let epSumText = document.createTextNode(`${removeHTML}`)

    header.appendChild(epName)
    header.appendChild(seasonNum)
    header.appendChild(epNum)
    sumText.appendChild(epSumText)

    epGroup.appendChild(header)
    epGroup.appendChild(medImg)
    epGroup.appendChild(sumText)

    rootElem.appendChild(epGroup)
  })
  document.getElementById("result").textContent = episodeList.length
}

function addOptions(totalEpisodes) {
  let select = document.getElementById("select")
  totalEpisodes.forEach(element => {
    let epSelected = document.createElement("option")
    if (element.number < 10) {
      let epSelectedContent = document.createTextNode(`S0${element.season}E${element.number} - ${element.name}`)
      epSelected.appendChild(epSelectedContent)
      select.appendChild(epSelected)
    } else {
      let epSelectedContent = document.createTextNode(`S0${element.season}E${element.number} - ${element.name}`)
      epSelected.appendChild(epSelectedContent)
      select.appendChild(epSelected)
    }
  })
}

window.onload = setup;
