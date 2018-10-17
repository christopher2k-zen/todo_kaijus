import { h, VNode, Node } from 'kaiju'

interface Props {
  href: string
  isActive?: boolean
  child: VNode | string | Node[]
}

export default function ({
  href,
  child,
  isActive = false
}: Props) {
  return (
    h('a.navbar-item', { class: { 'is-active': isActive }, attrs: { href }},
      child
    )
  )
}