import { useState, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import original from 'react95/dist/themes/original'
import { Button, Window, WindowHeader, WindowContent, Select } from 'react95'
import { createGlobalStyle } from 'styled-components'

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

const VOICE_STYLES: Record<VoiceStyle, { label: string; pitch: number; rate: number }> = {
  news: { label: '新闻联播风格', pitch: 0.8, rate: 0.85 },
  rap: { label: '西海岸说唱风格', pitch: 0.9, rate: 1.8 },
  anime: { label: '二次元风格', pitch: 2.0, rate: 1.3 },
}

const STYLE_OPTIONS = (Object.entries(VOICE_STYLES) as [VoiceStyle, { label: string; pitch: number; rate: number }][]).map(
  ([value, { label }]) => ({ value, label }),
)

function App() {
  const [playing, setPlaying] = useState(false)
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>('news')
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = () => {
    const { pitch, rate } = VOICE_STYLES[voiceStyle]
    const utterance = new SpeechSynthesisUtterance('转人工')
    utterance.lang = 'zh-CN'
    utterance.pitch = pitch
    utterance.rate = rate
    utterance.onend = () => {
      if (utteranceRef.current === utterance) {
        window.speechSynthesis.speak(utterance)
      }
    }
    utteranceRef.current = utterance
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    utteranceRef.current = null
    window.speechSynthesis.cancel()
  }

  const handleClick = () => {
    if (playing) {
      stop()
      setPlaying(false)
    } else {
      speak()
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
