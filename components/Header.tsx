import { useState, Fragment } from 'react'
import { Menu, Transition, Tab } from '@headlessui/react';
import Darkmode from './DarkMode';
import Link from 'next/link';
export interface HeaderProps {
  active: number
}

interface MenuItems {
  items: {
    label: string
    href: string
  }[],
  active: HeaderProps['active'],
  className?: string
}

const pages: Array<{ title: string, href: string }> = [
  { title: 'Home', href: '/' },
  { title: 'Resumos', href: '/summaries' },
]

const Items: MenuItems['items'] = pages.map(({ href, title }) => {
  return {
    href,
    label: title
  }
})

function DropdownMenu(props: MenuItems) {
  return (
    <div className="text-right my-0.5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center p-2 text-sm text-slate-500 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600 py-2.5 px-2.5">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            { props.items.map(item => (
              <div className="px-1 py-1" key={item.label}>
                <Menu.Item >
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-slate-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >{ item.label }</a>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}


function Tabs(props: MenuItems) {
  let [categories] = useState(props.items)

  return (
    <div className="max-h-min">
      <Tab.Group defaultIndex={props.active -1}>
        <Tab.List className="flex space-x-10 rounded-xl p-1 backdrop-blur-md bg-slate-50 dark:bg-slate-800 bg-opacity-30 dark:bg-opacity-30" >
          {categories.map(tab => (
            <a
              href={tab.href}
              key={tab.label}
              >
              <Tab
                className={({ selected }) => `w-full backdrop-blur-md bg-opacity-25 rounded-lg px-4 py-2.5 text-sm font-medium leading-5 text-blue-700 dark:text-blue-400 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${selected ? 'dark:bg-opacity-50 bg-white shadow dark:bg-slate-800' : 'dark:bg-opacity-10 text-blue-500 bg-slate-200 dark:bg-slate-700 hover:bg-white/[0.12] hover:text-white}'}`}
              >
                {tab.label}
              </Tab>
            </a>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}

export default function Header(props: HeaderProps) {
  // const imgsrc = '/logo.png'
  const title = 'Arthur Bufalo'
  return <nav className="bg-zinc-200 px-2 sm:px-4 py-2.5 dark:bg-zinc-800 w-full z-20 top-0 left-0 border-b border-slate-200 dark:border-slate-600 sticky dark:bg-opacity-50 bg-opacity-50 backdrop-blur-[8px] rounded-3xl">
  <div className="flex flex-wrap items-center justify-between ml-4 max-sm:ml-1">
  <Link href='/' className="flex items-center text-black dark:text-white order-1">
      {/* <img src={imgsrc} className="mr-3 h-10 pl-3 max-sm:h-9 max-sm:pl-0" alt={title + ' Logo'} /> */}
      <span className="self-start text-xl font-semibold whitespace-nowrap dark:text-white block">{title}</span>
  </Link>
  <div className="flex order-last space-x-1 ">
      <Darkmode />
      <Link type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 max-md:px-2 py-3 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden lg:block h-12" href='/register'>Registre-se</Link>
      <Link type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 my-0.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block lg:hidden h-12 aspect-1' href='/register'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      </Link>
      <DropdownMenu className='p-3 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600 h-12 aspect-1' data-collapse-toggle="navbar-sticky" aria-controls="navbar-sticky" aria-expanded="false" items={Items} active={-1} />
  </div>
  <div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1" id="navbar-sticky">
    <div className="flex flex-col mt-4 border border-slate-100 rounded-lg bg-slate-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-transparent dark:bg-transparent">
      <Tabs items={Items} active={props.active} />
    </div>
  </div>
  </div>
</nav>
}