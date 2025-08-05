export function capitalize(name) {
  if (name === "") {
    return;
  } else {
    // let firstLetter = name.charAt(0);
    // let firstLetterCap = firstLetter.toUpperCase();
    // let remainLetters = name.slice(1);
    // let capitalizedName = firstLetterCap + remainLetters;
    // return capitalizedName;

    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
