export const sliderSettings = {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2
      },
      750: {
        slidesPerView: 3
      },
      1100: {
        slidesPerView: 4,
      },
    },
  
  };

export const validateString = (value) => {
  return value?.length < 5 || value === null? "Must have atleast 5 characters": null;
}