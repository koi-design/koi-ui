import * as React from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Moon, Sun, Github, Menu as MenuIcon } from 'lucide-react'
import { Button, ScrollArea, Toaster, ScrollTop, cn } from '@/index'
import { nav, type NavItem } from './nav'

function useTheme() {
  const [dark, setDark] = React.useState(false)
  const toggle = () =>
    setDark((d) => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  return { dark, toggle }
}

function scrollToAnchor(anchor: string) {
  requestAnimationFrame(() => {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export function Layout() {
  const { dark, toggle } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const onItemClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault()
    setMobileOpen(false)
    if (location.pathname === item.to) scrollToAnchor(item.anchor)
    else {
      navigate(item.to)
      setTimeout(() => scrollToAnchor(item.anchor), 120)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Topbar */}
      <header className="z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur">
        <button className="lg:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          <MenuIcon className="size-5" />
        </button>
        <NavLink to="/" className="flex items-center gap-2 font-bold">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">K</span>
          koi-ui
        </NavLink>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">v0.0.1</span>
        <div className="flex-1" />
        <Button icon={dark ? Sun : Moon} text aria-label="Toggle theme" onClick={toggle} />
        <a
          href="https://github.com/koi-design/koi-ui"
          target="_blank"
          rel="noreferrer"
          className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
          aria-label="GitHub"
        >
          <Github className="size-5" />
        </a>
      </header>

      <div className="mx-auto flex w-full min-h-0 max-w-[90rem] flex-1">
        {/* Sidebar — fixed; the content area scrolls independently. */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 top-14 z-20 w-64 shrink-0 border-r border-border bg-background transition-transform lg:static lg:top-0 lg:h-full lg:translate-x-0',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <ScrollArea className="h-[calc(100vh-3.5rem)] px-3 py-4 lg:h-full">
            <nav className="space-y-5">
              {nav.map((group) => (
                <div key={group.title}>
                  <div className="px-2 pb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.title}
                  </div>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={`#${item.anchor}`}
                          onClick={(e) => onItemClick(e, item)}
                          className={cn(
                            'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted',
                            location.pathname === item.to ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 top-14 z-10 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* Content — the only scroll container */}
        <main data-scrollable className="relative min-w-0 flex-1 overflow-y-auto">
          <Outlet />
          <ScrollTop threshold={300} target="parent" />
        </main>
      </div>

      <Toaster />
    </div>
  )
}
