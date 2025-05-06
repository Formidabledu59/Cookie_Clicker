export function setupCounter(clickableElement, textElement) {
  let count = 0;
  clickableElement.addEventListener("click", () => {
    count++;
    textElement.innerText = `Vous avez cliqué ${count} fois`;
  });
}
