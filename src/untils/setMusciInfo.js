import { getAlbum, getMusic } from '../api/music'
export default async function setMusciInfo(data) {
  // 歌曲id
  const id = data.id
  // 获取专辑信息-封面
  const albumInfo = await getAlbum({ id: data.album.id })
  // 获取歌名
  const name = data.name
  // 获取歌手名
  const singerName = data.singerName || data.artists[0].name
  // 获取歌曲时间
  const duration = data.duration / 1000
  // url
  const urlInfo = await getMusic({ id: data.id })
  const musicInfo = {
    id,
    name,
    album: albumInfo,
    singerName,
    duration,
    url: urlInfo.data[0].url
  }
  return musicInfo
}
