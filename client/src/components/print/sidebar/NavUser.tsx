"use client"

import {
  CreditCardIcon,
  LogOutIcon,
  MoonIcon,
  MoreVerticalIcon,
  SettingsIcon,
  SunIcon,
  UserCircleIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { useState } from "react"

export function NavUser() {
  const { user, logout } = useAuth()
  const { theme, systemTheme, setTheme } = useTheme()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  if (!user) return null
  const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.phone
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            aria-label="User Menu"
            className="h-full py-2 max-w-60 cursor-pointer"
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src='/avatars/johndoe.jpg' alt={fullName} />
              {/* <AvatarImage src={user.avatar} alt={fullName} /> */}
              <AvatarFallback className="rounded-lg">{fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{fullName}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
            <MoreVerticalIcon className="ml-auto size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src='/avatars/johndoe.jpg' alt={fullName} />
                {/* <AvatarImage src={user.avatar} alt={fullName} /> */}
                <AvatarFallback className="rounded-lg">{fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserCircleIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={toggleTheme} className="flex items-center gap-2 w-full">
                {
                  (theme === 'light') ? <SunIcon /> : (theme === 'dark') ? <MoonIcon /> : <SettingsIcon />
                }
                Toggle Theme
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => setLogoutDialogOpen(true)}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? This will end your current session.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer" onClick={() => setLogoutDialogOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" className="cursor-pointer" onClick={logout}>
                Log out
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    
  )
}
