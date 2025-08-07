import React from 'react'
import { LuSearch, LuGalleryVerticalEnd } from 'react-icons/lu'
import { NavUser } from './sidebar/NavUser'

export default function Searchbar() {
  return (
    <header className='flex justify-between items-stretch gap-4 max-md:px-2'>
      <div className='flex items-center gap-2 sm:gap-3'>
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <LuGalleryVerticalEnd className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate text-xl font-semibold">PrintMate Kiosk</span>
        </div>
      </div>
      <div className='grow max-sm:text-sm flex items-center gap-3 sm:gap-4 border border-muted-foreground/50 rounded-full bg-background py-2 sm:py-3 px-4 sm:px-6 focus-within:ring'>
        <label htmlFor="search"><LuSearch className='text-muted-foreground size-[1.2em] sm:size-[1.1em]' /></label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder='Search anything...'
          className='grow outline-none bg-transparent border-none'
        />
      </div>
      <NavUser />
    </header>
  )
}
