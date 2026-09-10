import { Mail, Phone, MessageCircleMore } from 'lucide-react'

const details = [
  {
    method: 'Email Us',
    info: 'niicsoutreachboard@gmail.com',
    links: 'mailto:niicsoutreachboard@gmail.com',
    icon: Mail,         
    color: 'bg-red-500'
  },
  {
    method: 'Call Us',
    info: '+91 98765 43210',
    links: 'tel:+919876543210',
    icon: Phone,
    color: 'bg-slate-500'
  },
  {
    method: 'Contact Us via Whatsapp',
    info: '+91 98765 43210',
    links: 'https://wa.me/919876543210',
    icon: MessageCircleMore,
    color: 'bg-green-500'
  }
]

export default details