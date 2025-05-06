document.addEventListener("DOMContentLoaded", function () {
  const houseThemes = {
    gryffindor: {
      bg: "images/gryffindor-bg.jpeg",
      color: "#ae0001",
    },
    hufflepuff: {
      bg: "images/hufflepuff-bg.jpeg",
      color: "#ecb939",
    },
    ravenclaw: {
      bg: "images/ravenclaw-bg.jpeg",
      color: "#222f5b",
    },
    slytherin: {
      bg: "images/slytherin-bg.jpeg",
      color: "#2a623d",
    },
  };

  const cards = document.querySelectorAll(".house-card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const house = this.dataset.house;
      const theme = houseThemes[house];

      // Change background image
      document.body.style.backgroundImage = `url(${theme.bg})`;

      // change accent colors
      document.querySelectorAll(".house-card").forEach((c) => {
        c.style.borderColor = theme.color;
        c.style.boxShadow = `0 0 20px ${theme.color}`;
      });

      // Play sound
      //if (theme.sound) {
      //    const audio = new Audio(theme.sound);
      //    audio.play();
      //}
    });
  });
});

// Autoplay audio when the page loads
window.addEventListener("load", function () {
  let audioFrame = document.querySelector("iframe");
  audioFrame.src += "&autoplay=1";
});
