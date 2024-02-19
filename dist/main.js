let video = document.getElementById('video-one');
let playButton = document.querySelector('.down-cheveron');
let videoTitle = document.querySelector('.video-title');
let isPlaying = false;

playButton.addEventListener('click',function() {
  if (isPlaying) {
    video.pause();
    playButton.style.display = 'block';
    videoTitle.style.display = 'block';
  } else {
    video.play();
    playButton.style.display = 'none';
    videoTitle.style.display = 'none';
  }
  isPlaying = !isPlaying;
})


const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const sliderScrollbar = document.querySelector(".square-slider_container .scrollbar-track");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Update scrollbar thumb position when scrolling the image list
  imageList.addEventListener("scroll", updateScrollThumbPosition);
};

// Initialize slider when the window loads or resizes
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
