export const dateFormat = (date) => {
    let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;
return currentDate
}

export const genresList =[
"Action",
"Adventure",
"Anime",
"Comedy",
"Crime",
"Drama",
"Espionage",
"Family",
"Fantasy",
"History",
"Horror",
"Legal",
"Medical",
"Music",
"Mystery",
"Romance",
"Science-Fiction",
"Sports",
"Supernatural",
"Thriller",
"War",
"Western"]