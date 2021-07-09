<template>
  <div class="henlo">
    <input
      v-model="artist"
      type="text"
      id="artist"
      @keypress.enter="searchArtist"
      placeholder="type artist name"
    />
    <button @click="searchArtist" :disabled="!isComplete" class="search">
      <i class="fa fa-search"></i> search
    </button>
    <div v-if="albums" class="results">
      <h3 v-if="albums.length > 0" class="msg">
        🙌 {{ albums.length }} albums found for {{ artist.toUpperCase() }} ✨
      </h3>
      <h3 v-else class="msg no-results">
        😳 Sorry, no results found for {{ artist.toUpperCase() }}
      </h3>
      <input
        v-if="albums.length > 0"
        type="text"
        v-model="albumFilter"
        placeholder="filter albums"
        class="filter"
      />
      <ul class="albums-list">
        <li
          v-for="album in filteredAlbums"
          :key="album.collectionId"
          class="album-card"
        >
          <h4 class="title">{{ album.collectionName }}</h4>
          <img
            class="cover"
            :src="album.artworkUrl100"
            alt="album.collectionName"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "Albums",
  data() {
    return {
      artist: null,
      albums: null,
      albumFilter: null,
    };
  },
  computed: {
    filteredAlbums: function() {
      if (!this.albums) return [];
      if (!this.albumFilter || this.albumFilter === "") return this.albums;
      return _.filter(this.albums, (a) => {
        return a.collectionName
          .toLowerCase()
          .includes(this.albumFilter.toLowerCase());
      });
    },
    isComplete() {
      return this.artist;
    },
  },
  methods: {
    searchArtist: function() {
      fetch(`http://localhost:8081/api/albums?artist=${this.artist}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.albums = data.uniqueAlbums;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  #artist {
    font-family: "space mono", monospace;
    border: 2px solid black;
  }
  .search {
    color: green;
    font-family: "space mono", monospace;
    font-weight: bold;
    border: 2px solid black;
    margin-left: 1rem;
    &.search:disabled {
      color: gray;
      font-weight: normal;
      border: 2px solid gray;
    }
  }
  .msg {
    color: green;
    &.no-results {
      color: red;
    }
  }
  .filter {
    font-family: "space mono", monospace;
    border: 2px solid black;
  }
  .albums-list {
    list-style-type: none;
    padding: 2rem;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1.5rem;
    .album-card {
      border: 2px solid green;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0;
      max-width: 300px;
      background-color: white;
      .title {
        text-align: center;
        flex: 1;
        margin: 5px;
      }
      .cover {
        margin-top: auto;
        border-top: 2px solid green;
      }
    }
  }

</style>
