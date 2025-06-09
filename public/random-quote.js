async function fetchQuote() {
  try {
    const response = await fetch('http://127.0.0.1:8787/api/random');
    const data = await response.json();

    const quote = data[0]?.quote || "404";
    document.getElementById("quote-span").textContent = quote;

  } catch (error) {
    document.getElementById("quote-span").textContent = error;
  }
}

document.addEventListener("DOMContentLoaded", fetchQuote);
