import { useState, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import original from 'react95/dist/themes/original'
import { Button, Window, WindowHeader, WindowContent, Select } from 'react95'
import { createGlobalStyle } from 'styled-components'
import womanOgg from './voices/woman.ogg'
import manOgg from './voices/man.ogg'
import lolitaOgg from './voices/lolita.ogg'
import { GithubDesktopIcon } from './components/GithubDesktopIcon'

const GITHUB_URL = 'https://github.com/guoyunhe/zhuanrengong'

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  html,
  body {
    margin: 0;
    min-height: 100vh;
    background: #008080;
    font-family: 'ms_sans_serif';
    overflow: hidden;
  }

  #root {
    min-height: 100vh;
  }
`

type VoiceStyle = 'news' | 'rap' | 'anime'

const VOICE_STYLES: Record<VoiceStyle, { label: string; src: string }> = {
  news: { label: '御姐风格', src: womanOgg },
  rap: { label: '大叔风格', src: manOgg },
  anime: { label: '萝莉风格', src: lolitaOgg },
}

const STYLE_OPTIONS = (Object.entries(VOICE_STYLES) as [VoiceStyle, { label: string; src: string }][]).map(
  ([value, { label }]) => ({ value, label }),
)

function App() {
  const [playing, setPlaying] = useState(false)
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>('news')
  const [isIconSelected, setIsIconSelected] = useState(true)
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

  const openGithubSite = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <main
        onClick={() => setIsIconSelected(false)}
        style={{
          position: 'relative',
          minHeight: '100vh',
          padding: 18,
          background:
            'radial-gradient(circle at top left, rgba(255,255,255,0.12), transparent 22%), linear-gradient(180deg, #0a8c8c 0%, #007171 100%)',
        }}
      >
        <GithubDesktopIcon
          selected={isIconSelected}
          onSelect={() => setIsIconSelected(true)}
          onOpen={openGithubSite}
        />

        <Window
          style={{
            width: 320,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={(event) => event.stopPropagation()}
        >
            <WindowHeader style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <img src="./favicon.png" alt="" style={{ width: 24, height: 24, imageRendering: 'pixelated' }} />
              转人工
            </WindowHeader>
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
      </main>
    </ThemeProvider>
  )
}

export default App
