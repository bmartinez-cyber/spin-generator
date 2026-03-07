import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [artist, setArtist] = useState('')
  const [theme, setTheme] = useState('')
  const [startBpm, setStartBpm] = useState(90)
  const [playlistLength, setPlaylistLength] = useState(8)
  const [playlist, setPlaylist] = useState([])
  const [loading, setLoading] = useState(false)
  const [savedPlaylists, setSavedPlaylists] = useState([])

  const generatePlaylist = async () => {
    if (!artist || !theme) {
      alert('Please enter an artist and theme!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artist, theme, startBpm, playlistLength }),
      })
      const data = await response.json()
      setPlaylist(data.songs || [])
    } catch (error) {
      console.error('Error:', error)
      alert('Error generating playlist. Check your API key!')
    }
    setLoading(false)
  }

  const savePlaylist = () => {
    if (playlist.length === 0) {
      alert('No playlist to save!')
      return
    }
    const newPlaylist = {
      id: Date.now(),
      theme,
      artist,
      songs: playlist,
      savedAt: new Date().toLocaleString(),
    }
    setSavedPlaylists([...savedPlaylists, newPlaylist])
    alert('Playlist saved!')
  }

  const copyPlaylistToClipboard = () => {
    if (playlist.length === 0) return
    const text = playlist
      .map(
        (song, i) =>
          `${i + 1}. ${song.name} - ${song.artist} (${song.bpm} BPM - ${song.energy})`
      )
      .join('\n')
    navigator.clipboard.writeText(text)
    alert('Playlist copied to clipboard!')
  }

  return (
    <>
      <Head>
        <title>🔥 Spin Playlist Generator</title>
        <meta
          name="description"
          content="Generate fire playlists for your spin class with perfect BPM progression"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 drop-shadow-lg">
              🔥 SPIN PLAYLIST GENERATOR
            </h1>
            <p className="text-xl text-gray-300">
              Create fire hip-hop playlists with perfect BPM progression
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Generator Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 bg-opacity-60 rounded-2xl p-8 backdrop-blur-md border border-pink-500 border-opacity-30 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-pink-400">
                  ✨ Create Your Playlist
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Drake, Pitbull, Travis Scott"
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      className="w-full p-3 bg-gray-800 border-2 border-pink-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-300 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">
                      Theme Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Drake Takeover, Pitbull Party"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full p-3 bg-gray-800 border-2 border-pink-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-300 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Starting BPM
                      </label>
                      <input
                        type="number"
                        value={startBpm}
                        onChange={(e) => setStartBpm(Number(e.target.value))}
                        className="w-full p-3 bg-gray-800 border-2 border-pink-500 rounded-lg text-white focus:outline-none focus:border-pink-300 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        # of Songs
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={playlistLength}
                        onChange={(e) =>
                          setPlaylistLength(Math.max(1, Number(e.target.value)))
                        }
                        className="w-full p-3 bg-gray-800 border-2 border-pink-500 rounded-lg text-white focus:outline-none focus:border-pink-300 transition"
                      />
                    </div>
                  </div>

                  <button
                    onClick={generatePlaylist}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-black py-4 px-6 rounded-lg transition transform hover:scale-105 text-lg shadow-lg"
                  >
                    {loading ? '⏳ GENERATING...' : '🎵 GENERATE PLAYLIST'}
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Playlists Section */}
            <div>
              <div className="bg-gray-900 bg-opacity-60 rounded-2xl p-6 backdrop-blur-md border border-purple-500 border-opacity-30 shadow-2xl max-h-96 overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-purple-400">
                  📚 Saved Playlists ({savedPlaylists.length})
                </h3>
                {savedPlaylists.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No saved playlists yet. Create one to save!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedPlaylists.map((p) => (
                      <div
                        key={p.id}
                        className="bg-gray-800 p-3 rounded-lg border-l-4 border-purple-400"
                      >
                        <p className="font-bold text-sm text-purple-300">
                          {p.theme}
                        </p>
                        <p className="text-xs text-gray-400">
                          by {p.artist} • {p.songs.length} songs
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{p.savedAt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Playlist Display */}
          {playlist.length > 0 && (
            <div className="mt-12">
              <div className="bg-gray-900 bg-opacity-60 rounded-2xl p-8 backdrop-blur-md border border-pink-500 border-opacity-30 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-pink-400 mb-2">
                      📋 {theme}
                    </h2>
                    <p className="text-gray-400">
                      {playlist.length} songs • Starting at {startBpm} BPM
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={copyPlaylistToClipboard}
                      className="bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={savePlaylist}
                      className="bg-pink-600 hover:bg-pink-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      💾 Save
                    </button>
                  </div>
                </div>

                {/* BPM Visualization */}
                <div className="mb-8 p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-3">📊 BPM Progression</p>
                  <div className="flex items-end gap-2 h-24">
                    {playlist.map((song, i) => (
                      <div key={i} className="flex-1">
                        <div
                          className="bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg hover:opacity-80 transition"
                          style={{
                            height: `${(song.bpm / 180) * 100}%`,
                            minHeight: '20px',
                          }}
                          title={`${song.name}: ${song.bpm} BPM`}
                        ></div>
                        <p className="text-xs text-center text-gray-400 mt-1">
                          {song.bpm}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Songs List */}
                <div className="space-y-3">
                  {playlist.map((song, i) => (
                    <a
                      key={i}
                      href={`https://soundcloud.com/search?q=${encodeURIComponent(
                        song.name
                      )}+${encodeURIComponent(song.artist)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-800 border-l-4 border-pink-500 hover:bg-gray-700 hover:border-pink-400 transition rounded"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold text-lg">
                            {i + 1}. {song.name}
                          </p>
                          <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-black text-pink-400 text-lg">
                            {song.bpm} BPM
                          </p>
                          <p className="text-xs text-gray-300 bg-purple-900 px-2 py-1 rounded">
                            {song.energy}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  💡 Click any song to find it on SoundCloud!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
