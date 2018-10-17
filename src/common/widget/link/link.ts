import { h } from 'kaiju'


interface LinkProps {
  href: string
  isActive?: boolean
  label: string
}

export default function link({ href, label }: LinkProps) {

  return (
    h('a', {
      attrs: { href, 'data-nav': 'mousedown' }
    }, label)
  )
}
