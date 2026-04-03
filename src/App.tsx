import { useState, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import original from 'react95/dist/themes/original'
import { Button, Window, WindowHeader, WindowContent } from 'react95'
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

function App() {
  const [playing, setPlaying] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance('转人工')
    utterance.lang = 'zh-CN'
    utterance.rate = 1
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
