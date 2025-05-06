// Autoplay audio when the page loads
window.addEventListener("load", function () {
  let audioFrame = document.querySelector("iframe");
  audioFrame.src += "&autoplay=1";
});
