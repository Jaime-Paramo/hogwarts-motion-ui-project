document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sortingForm");
  const resultDiv = document.getElementById("result");

  const houseColors = {
    gryffindor: "#ae0001",
    hufflepuff: "#ecb939",
    ravenclaw: "#222f5b",
    slytherin: "#2a623d",
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const answers = {
      q1: document.querySelector('input[name="q1"]:checked')?.value,
      q2: document.querySelector('input[name="q2"]:checked')?.value,
      q3: document.querySelector('input[name="q3"]:checked')?.value,
      q4: document.querySelector('input[name="q4"]:checked')?.value,
    };

    // Check if all questions are answered
    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4) {
      resultDiv.innerHTML =
        "<p style='color:red;'>Please answer all questions!</p>";
      resultDiv.style.display = "block";
      return;
    }

    const houseCounts = {
      gryffindor: 0,
      hufflepuff: 0,
      ravenclaw: 0,
      slytherin: 0,
    };

    for (let q in answers) {
      houseCounts[answers[q]]++;
    }

    let sortedHouse = "";
    let maxCount = 0;
    for (let house in houseCounts) {
      if (houseCounts[house] > maxCount) {
        maxCount = houseCounts[house];
        sortedHouse = house;
      }
    }

    // Show result and add reset button
    resultDiv.innerHTML = `
      <h2>You belong in <span style="color:${houseColors[sortedHouse]}">
        ${sortedHouse.charAt(0).toUpperCase() + sortedHouse.slice(1)}
      !</span></h2>
      <a href="houses.html#${sortedHouse}" class="house-link">=> Visit Your House Page Here! <=</a><br><br>
      <button id="resetButton" class="button">Sort Again!</button>
    `;
    resultDiv.style.display = "block";

    // Hide the form and show the reset button
    form.style.display = "none";

    // Add reset functionality
    document.getElementById("resetButton").addEventListener("click", () => {
      form.reset();
      form.style.display = "block";
      resultDiv.innerHTML = "";
    });
  });
});
