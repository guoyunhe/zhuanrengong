import { useState, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import original from 'react95/dist/themes/original'
import { Button, Window, WindowHeader, WindowContent, Select } from 'react95'
import { createGlobalStyle } from 'styled-components'
import newsOgg from './assets/news.ogg'
import rapOgg from './assets/rap.ogg'
import animeOgg from './assets/anime.ogg'

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: teal;
    font-family: 'ms_sans_serif';
  }
`

type VoiceStyle = 'news' | 'rap' | 'anime'

const VOICE_STYLES: Record<VoiceStyle, { label: string; src: string }> = {
  news: { label: '新闻联播风格', src: newsOgg },
  rap: { label: '西海岸说唱风格', src: rapOgg },
  anime: { label: '二次元风格', src: animeOgg },
}

const STYLE_OPTIONS = (Object.entries(VOICE_STYLES) as [VoiceStyle, { label: string; src: string }][]).map(
  ([value, { label }]) => ({ value, label }),
)

function App() {
  const [playing, setPlaying] = useState(false)
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>('news')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = () => {
    const audio = new Audio(VOICE_STYLES[voiceStyle].src)
    audio.loop = true
    audioRef.current = audio
    audio.play()
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }

  const handleClick = () => {
    if (playing) {
      stop()
      setPlaying(false)
    } else {
      play()
      setPlaying(true)
    }
  }

  const handleStyleChange = (option: { value: VoiceStyle }) => {
    if (playing) {
      stop()
      setPlaying(false)
    }
    setVoiceStyle(option.value)
  }

  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <Window style={{ width: 320 }}>
        <WindowHeader>转人工</WindowHeader>
        <WindowContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            padding: 24,
          }}
        >
          <Select
            options={STYLE_OPTIONS}
            value={voiceStyle}
            onChange={handleStyleChange}
            width="100%"
          />
          <p style={{ margin: 0, textAlign: 'center' }}>
            {playing ? '正在播放"转人工"语音...' : '点击按钮开始播放"转人工"语音'}
          </p>
          <Button onClick={handleClick} style={{ minWidth: 120 }}>
            {playing ? '停止' : '转人工'}
          </Button>
        </WindowContent>
      </Window>
    </ThemeProvider>
  )
}

export default App
