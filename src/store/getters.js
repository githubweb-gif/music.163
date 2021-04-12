const getters = {
  musicInfo: state => state.music.musicInfo,
  musicList: state => state.music.list,
  playing: state => state.music.playing,
  // 歌单
  songLists: state => state.user.songLists
}

export default getters
