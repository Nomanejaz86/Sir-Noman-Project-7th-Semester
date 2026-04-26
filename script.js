async function summarizeText() {

    const text = document.getElementById("inputText").value;

    if (!text) {
        alert("Please enter some text");
        return;
    }

    document.getElementById("output").innerText = "Summarizing...";

    try {
        const response = await fetch("/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        document.getElementById("output").innerText = data.summary;

    } catch (error) {
        document.getElementById("output").innerText = "Error occurred!";
        console.error(error);
    }
}