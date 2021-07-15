export default function dragFunction (element: any) {
  // Code borrowed (but slightly modified for vertical dragging) from codepen by:
  // https://codepen.io/thenutz

  const slider: HTMLElement = element;
  let isDown = false;
  let startX: any;
  let startY: any;
  let scrollTop: any;
  let scrollLeft: any;

  slider.addEventListener("mousedown", (e: any) => {
    slider.style.cursor = "grab";
    isDown = true;
    slider.classList.add("active");
    startY = e.pageY - slider.offsetTop;
    startX = e.pageX - slider.offsetLeft;
    scrollTop = slider.scrollTop;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e: any) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walk = (x - startX) * 2; //scroll-fast
    const walkY = (y - startY) * 2;
    slider.scrollLeft = scrollLeft - walk;
    slider.scrollTop = scrollTop - walkY;
  });
}