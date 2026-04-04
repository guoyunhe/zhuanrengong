import githubIcon from '../github.png'

interface GithubDesktopIconProps {
  selected: boolean
  size?: number
  onSelect: () => void
  onOpen: () => void
}

export function GithubDesktopIcon({ selected, size = 32, onSelect, onOpen }: GithubDesktopIconProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onSelect()
      }}
      onDoubleClick={(event) => {
        event.stopPropagation()
        onOpen()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          onOpen()
        }
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        width: 92,
        border: 'none',
        background: 'transparent',
        color: '#fff',
        cursor: 'default',
        userSelect: 'none',
        padding: 8,
      }}
      aria-label="GitHub desktop icon"
    >
      <span
        aria-hidden="true"
        style={{
          position: 'relative',
          display: 'block',
          width: size,
          height: size,
        }}
      >
        <img
          src={githubIcon}
          alt=""
          width={size}
          height={size}
          style={{
            display: 'block',
            width: size,
            height: size,
            imageRendering: 'pixelated',
          }}
        />
        {selected ? (
          <>
            <span
              style={{
                position: 'absolute',
                inset: 1,
                border: '1px solid #fff',
                pointerEvents: 'none',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 3,
                border: '1px dotted #000080',
                pointerEvents: 'none',
              }}
            />
          </>
        ) : null}
      </span>
      <span
        style={{
          padding: '2px 4px',
          textAlign: 'center',
          lineHeight: 1.15,
          background: selected ? '#000080' : 'transparent',
          outline: selected ? '1px dotted #fff' : 'none',
        }}
      >
        GitHub
      </span>
    </button>
  )
}
