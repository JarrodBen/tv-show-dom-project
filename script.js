function setup() {
  let allShows = getAllShows(); 
  addTvShowOptionsToShowsPage(allShows); 
  makePageForTvShows(allShows); 
  addTvShowOptions(allShows); 

  
  for (let i = 0; i < allShows.length - 1; i++) {
    
    document
      .getElementsByClassName("tv-show-group")
      [i].addEventListener("click", function () {
        let valSelect = document.getElementsByClassName("tv-show")[i]
          .textContent;
        document.getElementById("showSelector").value = valSelect;
        let tvShowSelect = allShows.filter((element) => {
          if (element.name === valSelect) {
            return element;
          }
        });

        
        fetch(`https://api.tvmaze.com/shows/${tvShowSelect[0].id}/episodes`)
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              return response.json();
            } else {
              throw new Error(
                `Whoops you got this error code: ${response.status} ${response.statusText}`
              );
            }
          })
          .then((allEpisodes) => getAllEpisodes(allEpisodes))
          .catch((error) => console.log(error));
        document.getElementById("root").style.display = "flex";
        document.getElementById("search").style.display = "flex";
        document.getElementById("theTvShows").style.display = "none";
        document.getElementById("showSearcher").style.display = "none";
        document.getElementById("selectShow").style.display =
          "none";
      });
  }

  
  document
    .getElementById("selectShow")
    .addEventListener("change", function (e) {
      e.preventDefault();

      let tvShowSelect = document.getElementById("selectShow")
        .value;
      let disTvShow = allShows.filter((element) => {
        if (element.name.includes(tvShowSelect)) {
          return element;
        }
      });

      
      makePageForTvShows(disTvShow);
      for (let i = 0; i < disTvShow.length; i++) {
        document
          .getElementsByClassName("tv-show-group")
          [i].addEventListener("click", function () {
            let valSelect = document.getElementsByClassName("tv-show")[i]
              .textContent;
            document.getElementById("showSelector").value = valSelect;

            fetch(
              `https://api.tvmaze.com/shows/${disTvShow[0].id}/episodes`
            )
              .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                  return response.json();
                } else {
                  throw new Error(
                    `Whoops you got this error code: ${response.status} ${response.statusText}`
                  );
                }
              })
              .then((allEpisodes) => getAllEpisodes(allEpisodes))
              .catch((error) => console.log(error));
            document.getElementById("root").style.display = "flex";
            document.getElementById("search").style.display = "flex";
            document.getElementById("theTvShows").style.display = "none";
            document.getElementById("showSearcher").style.display = "none";
            document.getElementById("selectShow").style.display =
              "none";
          });
      }
    });

  
  document
    .getElementById("showSearcher")
    .addEventListener("input", function (e) {
      e.preventDefault();

      let tvShowSelect = document.getElementById("showSearcher").value;
      let input = tvShowSelect.toLowerCase();
      let disTvShow = allShows.filter((element) => {
        if (
          element.name.toLowerCase().match(input) ||
          element.summary.toLowerCase().match(input)
        ) {
          return element;
        }
      });

      
      makePageForTvShows(disTvShow);
      for (let i = 0; i < disTvShow.length; i++) {
        document
          .getElementsByClassName("tv-show-group")
          [i].addEventListener("click", function () {
            let valSelect = document.getElementsByClassName("tv-show")[i]
              .textContent;
            document.getElementById("showSelector").value = valSelect;

            fetch(
              `https://api.tvmaze.com/shows/${disTvShow[0].id}/episodes`
            )
              .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                  return response.json();
                } else {
                  throw new Error(
                    `Whoops you got this error code: ${response.status} ${response.statusText}`
                  );
                }
              })
              .then((allEpisodes) => getAllEpisodes(allEpisodes))
              .catch((error) => console.log(error));
            document.getElementById("root").style.display = "flex";
            document.getElementById("search").style.display = "flex";
            document.getElementById("theTvShows").style.display = "none";
            document.getElementById("showSearcher").style.display = "none";
            document.getElementById("selectShow").style.display =
              "none";
          });
      }
    });

  
  document
    .getElementById("showSelector")
    .addEventListener("change", function (e) {
      e.preventDefault();
      let valSelect = document.getElementById("showSelector").value;
      let tvShowSelect = allShows.filter((element) => {
        if (element.name === valSelect) {
          return element;
        }
      });
      // retrieve all episodes
      fetch(`https://api.tvmaze.com/shows/${tvShowSelect[0].id}/episodes`)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            throw new Error(
              `Whoops you got this error code: ${response.status} ${response.statusText}`
            );
          }
        })
        .then((allEpisodes) => getAllEpisodes(allEpisodes))
        .catch((error) => console.log(error));
    });


  function getAllEpisodes(allEpisodes) {
    makePageForEpisodes(allEpisodes); 
    addOptions(allEpisodes); 
    document.getElementById("selectAShow").addEventListener("change", function (e) {
      e.preventDefault();

      let epiSelect = document.getElementById("selectAShow").value;
      let input = epiSelect.slice(9, epiSelect.length);
      let epiDis = allEpisodes.filter((element) => {
        if (element.name.includes(input)) {
          return element;
        }
      });
      makePageForEpisodes(epiDis);
    });

    
    document.getElementById("epiTotal").textContent = allEpisodes.length;

    document.getElementById("allShows").addEventListener("input", function (e) {
      e.preventDefault();
      let valInp = document.getElementById("allShows").value;
      let input = valInp.toLowerCase();
      let searchRes = allEpisodes.filter((element) => {
        if (
          element.name.toLowerCase().match(input) ||
          element.summary.toLowerCase().match(input)
        ) {
          return element;
        }
      });
      makePageForEpisodes(searchRes);
    });
  }
}


function makePageForTvShows(liEpi) {
  let rootEl = document.getElementById("theTvShows");
  rootEl.innerHTML = " ";

  for (let i = 0; i < liEpi.length; i++) {
    let epiGroups = document.createElement("div");
    epiGroups.className = "tv-show-group";
    let statGroups = document.createElement("section");
    let header = document.createElement("h3");
    header.className = "tv-show";
    if (liEpi[i].image) {
      let medImg = document.createElement("img");
      medImg.src = liEpi[i].image.medium;
      let sumTxt = document.createElement("p");
      let removeHtml = liEpi[i].summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let epiName = document.createTextNode(`${liEpi[i].name}`);
      let epiSumTxt = document.createTextNode(`${htmlRemoved}`);

      let x = document.createElement("p");
      let y = document.createElement("p");
      let z = document.createElement("p");
      let j = document.createElement("p");

      let rated = document.createTextNode(
        `Rated: ${liEpi[i].rating.average}`
      );
      let genres = document.createTextNode(`Genres: ${liEpi[i].genres}`);
      let status = document.createTextNode(`Status: ${liEpi[i].status}`);
      let runTime = document.createTextNode(
        `Run time: ${liEpi[i].runtime}`
      );

      x.appendChild(rated);
      y.appendChild(genres);
      z.appendChild(status);
      j.appendChild(runTime);

      statGroups.appendChild(x);
      statGroups.appendChild(y);
      statGroups.appendChild(z);
      statGroups.appendChild(j);

      header.appendChild(epiName);
      sumTxt.appendChild(epiSumTxt);

      epiGroups.appendChild(header);
      epiGroups.appendChild(medImg);
      epiGroups.appendChild(sumTxt);
      epiGroups.appendChild(statGroups);

      rootEl.appendChild(epiGroups);
    }
  }
  document.getElementById("searchResult").textContent = liEpi.length;
}


function makePageForEpisodes(liEpi) {
  let rootEl = document.getElementById("root");
  rootEl.innerHTML = " ";

  liEpi.forEach((element) => {
    let epiGroups = document.createElement("div");
    let header = document.createElement("h3");
    if (element.image && element.summary) {
      let medImg = document.createElement("img");
      medImg.setAttribute("src", `${element.image.medium}`);
      let sumTxt = document.createElement("p");
      let removeHtml = element.summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let epiName = document.createTextNode(`${element.name}`);
      let seasNum = document.createTextNode(` - S0${element.season}`);
      let epiNum = document.createTextNode(`E0${element.number}`);
      let epiSumTxt = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(epiName);
      header.appendChild(seasNum);
      header.appendChild(epiNum);
      sumTxt.appendChild(epiSumTxt);

      epiGroups.appendChild(header);
      epiGroups.appendChild(medImg);
      epiGroups.appendChild(sumTxt);

      rootEl.appendChild(epiGroups);
    } else if (element.summary === null) {
      let medImg = document.createElement("img");
      medImg.setAttribute(
        "src",
        "https://www.kapa-oil.com/wp-content/plugins/slider/images/slider-icon.png"
      );
      medImg.style.width = "100px";
      let sumTxt = document.createElement("p");
      element.summary = "No description";
      let removeHtml = element.summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let epiName = document.createTextNode(`${element.name}`);
      let seasNum = document.createTextNode(` - S0${element.season}`);
      let epiNum = document.createTextNode(`E0${element.number}`);
      let epiSumTxt = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(epiName);
      header.appendChild(seasNum);
      header.appendChild(epiNum);
      sumTxt.appendChild(epiSumTxt);

      epiGroups.appendChild(header);
      epiGroups.appendChild(medImg);
      epiGroups.appendChild(sumTxt);

      rootEl.appendChild(epiGroups);
    } else {
      let medImg = document.createElement("img");
      medImg.setAttribute(
        "src",
        "https://www.kapa-oil.com/wp-content/plugins/slider/images/slider-icon.png"
      );
      medImg.style.width = "100px";
      let sumTxt = document.createElement("p");
      let removeHtml = element.summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let epiName = document.createTextNode(`${element.name}`);
      let seasNum = document.createTextNode(` - S0${element.season}`);
      let epiNum = document.createTextNode(`E0${element.number}`);
      let epiSumTxt = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(epiName);
      header.appendChild(seasNum);
      header.appendChild(epiNum);
      sumTxt.appendChild(epiSumTxt);

      epiGroups.appendChild(header);
      epiGroups.appendChild(medImg);
      epiGroups.appendChild(sumTxt);

      rootEl.appendChild(epiGroups);
    }
  });
  document.getElementById("searchResult").textContent = liEpi.length;
}


function addTvShowOptionsToShowsPage(liTotalEpi) {
  let select = document.getElementById("selectShow");
  liTotalEpi.forEach((element) => {
    let option = document.createElement("option");
    let optionContent = document.createTextNode(`${element.name}`);
    option.appendChild(optionContent);
    select.appendChild(option);
  });
}


function addTvShowOptions(liTotalEpi) {
  let select = document.getElementById("showSelector");
  liTotalEpi.forEach((element) => {
    let option = document.createElement("option");
    let optionContent = document.createTextNode(`${element.name}`);
    option.appendChild(optionContent);
    select.appendChild(option);
  });
}


function addOptions(liTotalEpi) {
  let select = document.getElementById("selectAShow");
  select.innerHTML = " ";
  liTotalEpi.forEach((element) => {
    let option = document.createElement("option");
    if (element.season < 10 && element.number < 10) {
      let optionContent = document.createTextNode(
        `S0${element.season}E0${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    } else if (element.season > 9 && element.number > 9) {
      let optionContent = document.createTextNode(
        `S${element.season}E${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    } else if (element.season > 9 && element.number < 10) {
      let optionContent = document.createTextNode(
        `S${element.season}E0${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    } else {
      let optionContent = document.createTextNode(
        `S0${element.season}E${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    }
  });
}

window.onload = setup;


document.getElementById("showTvPage").addEventListener("click", function () {
  window.parent.location = window.parent.location.href;
});