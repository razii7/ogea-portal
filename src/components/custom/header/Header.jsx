import { useState, useEffect, useCallback, memo } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import links from '../../../lib/links'
import { X, LogOut, LayoutDashboard } from 'lucide-react'
import Hamburger from 'hamburger-react'
import logoImg from '/logo.svg'
import { useAuth } from '@/context/AuthContext'

// Memoized NavItem component
const NavItem = memo(({ link, onClick, isMobile = false }) => (
  <NavLink
    to={link.path}
    onClick={onClick}
    className={({ isActive }) =>
      isMobile
        ? `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive 
              ? 'text-white bg-[#0f2545] shadow-md' 
              : 'text-gray-700 hover:bg-slate-50 hover:text-[#0f2545]'
          }`
        : `px-2.5 py-2 rounded-lg transition-all duration-200 text-[13px] font-semibold whitespace-nowrap ${
            isActive 
              ? 'text-[#0f2545] bg-slate-50' 
              : 'text-gray-500 hover:text-[#0f2545] hover:bg-slate-50/60'
          }`
    }
  >
    {link.name}
  </NavLink>
))

NavItem.displayName = 'NavItem'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { isAuthenticated, isAdmin, logout } = useAuth()
    const navigate = useNavigate()

    const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

    const handleLogout = useCallback(() => {
        logout()
        closeMobileMenu()
        navigate('/')
    }, [logout, closeMobileMenu, navigate])

    // Combined effect for all side effects
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) closeMobileMenu()
        }

        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('nav')) {
                closeMobileMenu()
            }
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'

        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll, { passive: true })
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen, closeMobileMenu])

    return (
        <header className={`w-full sm:w-[90%] lg:w-4/5 xl:w-3/4 mx-auto my-2 rounded-2xl font-quicksand sticky top-2 z-50 transition-all duration-300 ${
            scrolled 
              ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border border-slate-100' 
              : 'bg-white shadow-md border border-transparent'
        }`}>
            <nav className="mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800 flex-shrink-0">
                        <NavLink 
                            to="/" 
                            onClick={closeMobileMenu}
                            className="block"
                        >
                            <img 
                                src={logoImg} 
                                alt="OGEA Logo" 
                                className="h-8 md:h-10 w-auto"
                            />
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavItem link={link} />
                            </li>
                        ))}
                        <li className="pl-3">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={isAdmin ? '/admin' : '/student'}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f2545] text-white text-sm font-semibold hover:bg-[#1a3561] transition-all duration-200 shadow-sm shadow-slate-300"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        {isAdmin ? 'Admin Panel' : 'Dashboard'}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        title="Log out"
                                        className="p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center px-5 py-2 rounded-xl bg-[#0f2545] text-white text-sm font-semibold hover:bg-[#1a3561] transition-all duration-200 shadow-sm shadow-slate-300"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="block md:hidden">
                        <Hamburger
                            toggled={isMobileMenuOpen}
                            toggle={setIsMobileMenuOpen}
                            size={22}
                            color="#0f2545"
                        />
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        onClick={closeMobileMenu}
                    />
                )}

                {/* Mobile Menu Sheet */}
                <div
                    className={`
                        md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw]
                        bg-white shadow-2xl overflow-hidden
                        transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-50
                        ${isMobileMenuOpen 
                            ? 'translate-x-0' 
                            : 'translate-x-full'
                        }
                    `}
                >
                    {/* Sheet Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <img 
                                src={logoImg} 
                                alt="OGEA Logo" 
                                className="h-8 w-auto"
                            />
                        </div>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
                            aria-label="Close menu"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-6">
                        <ul className="space-y-1">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <NavItem link={link} onClick={closeMobileMenu} isMobile />
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            {isAuthenticated ? (
                                <div className="space-y-2">
                                    <Link
                                        to={isAdmin ? '/admin' : '/student'}
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0f2545] text-white font-semibold text-sm shadow-sm"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        {isAdmin ? 'Admin Panel' : 'My Dashboard'}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 font-medium text-sm hover:bg-red-50 transition"
                                    >
                                        <LogOut className="w-4 h-4" /> Log out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0f2545] text-white font-semibold text-sm shadow-sm"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </nav>

                    {/* Sheet Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-100 bg-slate-50/80">
                        <p className="text-xs text-gray-400 text-center">
                            © 2025 OGEA. All rights reserved.
                        </p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header