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

  export const updateFavourites = (id, favourites) => {
    // Ensure favourites is defined before accessing its properties
    if (favourites) {
      if (favourites.includes(id)) {
        return favourites.filter((resId) => resId !== id);
      } else {
        return [...favourites, id];
      }
    } else {
      // Handle the case where favourites is undefined
      return [id];
    }
  };
  
  export const checkFavourites = (id, favourites) => {
    return favourites?.includes(id) ? "#fa3e5f" : "white"
  }

export const validateString = (value) => {
  return value?.length < 5 || value === null? "Must have atleast 5 characters": null;
}