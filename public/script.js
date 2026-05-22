async function getQuote() {

    const response = await fetch(
        "http://localhost:5000/quote"
    );

    const data = await response.json();

    document.getElementById("quote")
        .innerText = data.content;

    document.getElementById("author")
        .innerText = "- " + data.author;

    loadHistory();
}

async function loadHistory() {

    const response = await fetch(
        "http://localhost:5000/history"
    );

    const data = await response.json();

    const history = document.getElementById("history");

    history.innerHTML = "";

    data.forEach(q => {

        const li = document.createElement("li");

        li.innerText =
            `${q.content} — ${q.author}`;

        history.appendChild(li);
    });
}

loadHistory();
