'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const themes = [
  { name: 'Default', value: '', color: 'bg-zinc-900 dark:bg-zinc-100' },
  { name: 'Blue', value: 'theme-blue', color: 'bg-blue-600' },
  { name: 'Green', value: 'theme-green', color: 'bg-green-600' },
  { name: 'Rose', value: 'theme-rose', color: 'bg-rose-600' },
  { name: 'Orange', value: 'theme-orange', color: 'bg-orange-600' },
  { name: 'Violet', value: 'theme-violet', color: 'bg-violet-600' },
]

export function ThemeColorPicker() {
  const [colorTheme, setColorTheme] = React.useState('')

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme') || ''
    setColorTheme(savedTheme)
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme)
    }
  }, [])

  const handleThemeChange = (theme: string) => {
    themes.forEach((t) => {
      if (t.value) {
        document.documentElement.classList.remove(t.value)
      }
    })

    if (theme) {
      document.documentElement.classList.add(theme)
    }

    setColorTheme(theme)
    localStorage.setItem('color-theme', theme)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="flex h-[1.2rem] w-[1.2rem] items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary" />
          </div>
          <span className="sr-only">Choose color theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3">
        <div className="space-y-1.5">
          <div className="text-sm font-medium">Color Theme</div>
          <div className="grid gap-1">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                <div
                  className={`h-5 w-5 rounded-full border-2 border-muted ${theme.color}`}
                />
                <span className="flex-1 text-left">{theme.name}</span>
                {colorTheme === theme.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
