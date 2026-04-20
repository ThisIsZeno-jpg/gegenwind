import React from 'react'

type RichTextNode = {
  type: string
  children?: RichTextNode[]
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  format?: number
  tag?: string
  listType?: string
  url?: string
  fields?: { url?: string; newTab?: boolean }
  value?: { alt?: string; url?: string }
}

type Props = {
  content: { root: { children: RichTextNode[] } } | null | undefined
}

function renderNode(node: RichTextNode, index: number): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'text': {
      let text: React.ReactNode = node.text
      if (node.bold) text = <strong>{text}</strong>
      if (node.italic) text = <em>{text}</em>
      if (node.underline) text = <u>{text}</u>
      if (node.strikethrough) text = <s>{text}</s>
      return <React.Fragment key={index}>{text}</React.Fragment>
    }

    case 'paragraph':
      return (
        <p key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      )

    case 'heading': {
      const Tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4'
      return (
        <Tag key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </Tag>
      )
    }

    case 'list':
      if (node.listType === 'ordered') {
        return (
          <ol key={index}>
            {node.children?.map((child, i) => renderNode(child, i))}
          </ol>
        )
      }
      return (
        <ul key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </ul>
      )

    case 'listitem':
      return (
        <li key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </li>
      )

    case 'quote':
      return (
        <blockquote key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </blockquote>
      )

    case 'link': {
      const url = node.fields?.url || '#'
      const newTab = node.fields?.newTab
      return (
        <a
          key={index}
          href={url}
          {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      )
    }

    default:
      if (node.children) {
        return (
          <React.Fragment key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </React.Fragment>
        )
      }
      return null
  }
}

export function RichText({ content }: Props) {
  if (!content?.root?.children) return null
  return (
    <>
      {content.root.children.map((node, i) => renderNode(node, i))}
    </>
  )
}
