export function LoadingState({ text = 'Loading...' }) {
  return <p className="status loading">{text}</p>
}

export function ErrorState({ text }) {
  return <p className="status error">{text}</p>
}

export function EmptyState({ text }) {
  return <p className="status empty">{text}</p>
}
