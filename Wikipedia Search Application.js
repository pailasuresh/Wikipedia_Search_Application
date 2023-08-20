let search = document.getElementById("searchInput");
let search_result_section = document.getElementById("searchResults");
let spinnerr = document.getElementById("spinner");

function create_and_append_dynamic_Wikipedia(result) {
    let {
        title,
        link,
        description
    } = result;
    //1.create a result div element

    let result_div = document.createElement("div");
    result_div.classList.add("result-item");
    search_result_section.appendChild(result_div);
    //2.Anchor title 
    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.href = link;
    resultTitle.textContent = title;
    resultTitle.target = "_blank";
    result_div.appendChild(resultTitle);
    //3 title break
    let titleBreak = document.createElement("br");
    result_div.appendChild(titleBreak);
    //4 anchor url
    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.href = link;
    urlEle.target = "_blank";
    urlEle.textContent = link;
    result_div.appendChild(urlEle);
    //5.url break
    let url_break = document.createElement("br");
    result_div.appendChild(url_break);
    //paragraph description
    let paragraph = document.createElement("p");
    paragraph.classList.add("link-description");
    paragraph.textContent = description;
    result_div.appendChild(paragraph);
}

function display_wikipedia(search_results) {
    spinnerr.classList.toggle("d-none");

    for (let result of search_results) {
        create_and_append_dynamic_Wikipedia(result);
    }
}

function wikipedia(event) {
    if (event.key === "Enter") {


        search_result_section.textContent = "";
        spinnerr.classList.toggle("d-none");
        let search_input_value = search.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + search_input_value;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                display_wikipedia(search_results);
            });
    }
}
search.addEventListener("keydown", wikipedia);