async function fetchQuote() {
  try {
    const response = await fetch('https://worker-quotebox.cunfus.cc/api/random');
    const data = await response.json();

    const quote = data[0]?.quote || "404";
    document.getElementById("quote-span").textContent = quote;

  } catch (error) {
    document.getElementById("quote-span").textContent = error;
  }
}

document.addEventListener("DOMContentLoaded", fetchQuote);