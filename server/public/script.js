// front end script
console.log("new file!");

const getArtistAlbums = () => {
  let artist = document.getElementById("artist").value;

  fetch("/albums?artist=" + artist) // calling to my own API
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(`For this artist, we have ${data.results} albums!`);
    //   let albumsList = data.resultCount;
    })
    .catch(err => {
      console.error(err);
    });
};
