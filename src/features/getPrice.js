export const getPrice = (releaseDate) => {

    const yearNow = new Date().getFullYear();
    const releaseYear = new Date(releaseDate).getFullYear();;
    const diff = yearNow - releaseYear;
    
    if (diff <= 3){
      return 149
    } else if (diff <= 5){
      return 99
    } else {
      return 49
    }
  };
export default getPrice