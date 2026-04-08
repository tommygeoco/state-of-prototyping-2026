interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  )
}
