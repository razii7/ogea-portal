import { memo } from 'react'
import logoImg from '/logo.svg'
import { Twitter, Instagram, Linkedin } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

const FOOTER_LINKS = [
  { name: 'Drive', href: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk' },
  { name: 'Programs', href: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk' },
  { name: 'Mail Us', href: 'mailto:niicsoutreachboard@gmail.com' },
  { name: 'Website', href: 'https://chsoutreach.live' },
]

const POLICY_LINKS = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookies Settings', href: '#' },
]

const Footer = memo(() => {
    return (
        <footer className="bg-[#0f2545] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-14">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <img src={logoImg} alt="OGEA Logo" className="h-28 w-28 mb-4 brightness-0 invert opacity-90" />
                        <p className="text-sm text-slate-300 mb-5 leading-relaxed max-w-sm">
                            OGEA Student Outreach Management Portal coordinates academic programs, research papers, creative publications, and external student opportunities.
                        </p>
                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <a 
                                    key={label}
                                    href={href} 
                                    rel="noopener noreferrer" 
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#c99a3c] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="text-left md:text-right">
                        <h3 className="text-sm font-bold text-[#c99a3c] uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.map(({ name, href }) => (
                                <li key={name}>
                                    <a 
                                        href={href} 
                                        className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400">
                        © 2025 OGEA. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {POLICY_LINKS.map(({ name, href }) => (
                            <a 
                                key={name}
                                href={href} 
                                className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200"
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
})

Footer.displayName = 'Footer'

export default Footer