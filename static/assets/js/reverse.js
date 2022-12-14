function $(id) {
  if (id.charAt(0) !== "#") return false;
  return document.getElementById(id.substring(1));
}

var Sematle_reverse = (() => {
  let sumOfSimilarity = 0;

  async function init() {
    const result = await (await fetch("/today_word")).text();

    $("#@leo/target-word").appendChild(document.createTextNode(result));

    $("#form").addEventListener("submit", async (event) => {
      event.preventDefault();

      let guess = $("#guess")
        .value.trim()
        .replace("!", "")
        .replace("*", "")
        .replaceAll("/", "");

      $("#guess").value = "";

      const { sim, word } = await (
        await fetch(`/count/similarity/${guess}`)
      ).json();

      const sim100 = sim * 100;
      const simFloored = Math.floor(sim100 * 100) / 100;

      const guessDiv = document.createElement("div");
      guessDiv.appendChild(document.createTextNode(`${word}  `));
      guessDiv.appendChild(document.createTextNode(simFloored));
      $("#guesses").appendChild(guessDiv);

      sumOfSimilarity += simFloored;

      $("#@leo/score").innerText = sumOfSimilarity;
    });
  }

  return {
    init,
  };
})();

window.addEventListener("load", () => Sematle_reverse.init());
