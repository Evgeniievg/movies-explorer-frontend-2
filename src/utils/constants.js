export default function formatMovieDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if(hours) {
    return `${hours}ч ${minutes}м`;
  }
  else{
    return `${minutes}м`
  }
};

export const calculateVisibleCardCount = (width) => {
  if (width >= 1280) {
    return 16;
  } else if (width >= 768 && width < 1280) {
    return 9;
  } else if (width < 768 && width >= 550) {
    return 8;
  } else {
    return 5;
  }
};

export const calculateMoreMovies = (width) => {
  if (width >= 1280) {
    return 4;
  } else if (width >= 768 && width < 1280) {
    return 3;
  } else if (width < 768 && width >= 550) {
    return 2;
  } else {
    return 2;
  }
};

export const emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export const nameValidation = /^[A-Za-zА-Яа-яЁё\s-]*$/;

