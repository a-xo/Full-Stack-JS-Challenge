<template>
  <div class="hello">
    <input
      type="text"
      id="artist"
      v-model="artist"
      @keypress.enter="searchArtist"
      placeholder="type artist name"
    />
    <div v-if="albums"  class="results">
      <h3 v-if="albums.length > 0"> {{albums.length}} albums found</h3>
      <h3 v-else>sorry no results found</h3>
      <input v-if="albums.length > 0" type="text" v-model="albumFilter" placeholder="filter albums" />
      <div class="album-names">
        <div v-for="album in filteredAlbums" :key="album.collectionId" class="album">
          <img :src="album.artworkUrl100" alt="album.collectionName" />
          {{album.collectionName}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'

export default {
  name: 'Albums',
  data () {
    return {
      artist: null,
      albums: null,
      albumFilter: null
    }
  },
  computed: {
    filteredAlbums: function () {
      if (!this.albums) return []
      if (!this.albumFilter || this.albumFilter === '') return this.albums
      return _.filter(this.albums, a => {
        return a.collectionName.toLowerCase().includes(this.albumFilter.toLowerCase())
      })
    }
  },
  methods: {
    searchArtist: function () {
      fetch(`http://localhost:8081/api/albums?artist=${this.artist}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.albums = data.uniqueAlbums
          // alert(`For this artist, we have ${data.uniqueAlbumCount} albums!`)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
