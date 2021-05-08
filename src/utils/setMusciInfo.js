import { getAlbum, getMusic } from '../api/music'
export default async function setMusciInfo (data, millisecond) {
  // 歌曲id
  const id = data.id
  // 获取专辑信息-封面
  const album = {
    name: '',
    picUrl: '',
    publishTime: '',
    id: ''
  }
  const albumInfo = await getAlbum({ id: data.album.id })
  for (const i in album) {
    album[i] = albumInfo.album[i] || ''
  }
  console.log(album)
  // 获取歌名
  const name = data.name
  // 获取歌手名
  const singerName = data.singerName || data.artists[0].name
  // 获取歌曲时间
  let duration
  // millisecond是因为audio url错误时，它把歌曲时间右传过来，此时歌曲时间已经时秒，不应该在除以1000
  if (millisecond) {
    duration = data.duration
  } else {
    // 转换成秒，是因为audio的时间单位是秒
    duration = data.duration / 1000
  }

  // url
  const urlInfo = await getMusic({ id: data.id })
  const musicInfo = {
    id,
    name,
    album,
    singerName,
    duration,
    url: urlInfo.data[0].url || ''
  }
  return musicInfo
}
