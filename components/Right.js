import { HiOutlineShieldCheck } from 'react-icons/hi'
import { MdOutlineSettings } from 'react-icons/md'
import { BiBell } from 'react-icons/bi'
import { ViewGridIcon } from '@heroicons/react/solid'
import Dropdown from './Dropdown'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import RecentlyPlayed from './RecentlyPlayed'

function Right({ spotifyApi, chooseTrack }) {
  const { data: session } = useSession()
  const accessToken = session?.accessToken
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          }
        })
      )
    })
  }, [accessToken])
  return (
    <section className="space-y-8 p-4 pr-8">
      <div className="flex items-center justify-between space-x-2">
        {/* Icons */}
        <div className="flex h-12 items-center space-x-4 rounded-full border-2 border-[#262626] py-3 px-4">
          <HiOutlineShieldCheck className="text-xl text-[#CCCCCC]" />
          <MdOutlineSettings className="text-xl text-[#CCCCCC]" />
          <div>
            <BiBell className="text-xl text-[#CCCCCC]" />
          </div>
        </div>
        {/* Profile */}
        <Dropdown />
      </div>

      {/* Recently played tracks */}
      <div className="space-y-4 rounded-xl border-2 border-[#262626] bg-[#0d0d0d] p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Recently Played</h4>
          <ViewGridIcon className="h-6 text-[#686868]" />
        </div>

        <div className="h-[250px] space-y-4 overflow-x-hidden overflow-y-scroll scrollbar-hide md:h-[400px]">
          {recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <button className="btn">View All</button>
      </div>
    </section>
  )
}

export default Right
