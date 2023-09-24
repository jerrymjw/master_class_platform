"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { formUrlQuery } from '@/sanity/utils';

const SearchForm = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(search) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: search,
        }) 
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        }) 
      }

      router.push(newUrl, {scroll: false});
    },300)
  
    return () => clearTimeout(delayDebounceFn)
  }, [search])
  

  return (
    <form className='flex-center mx-auto mt-10 w-full sm:-mt-10 sm:px-5'>
      <label className="flex-center relative w-full max-w-3xl">
        <Image 
          src="/magnifying-glass.svg"
          alt="Search icon"
          width={32}
          height={32}
          className='absolute left-8'
        />
        <Input 
          type="text"
          placeholder="Search for a resource"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="base-regular h-fit border-0 bg-black-400 py-6 pl-20 pr-8 text-white-800 !ring-0 !ring-offset-0 placeholder:text-white-800"
        />
      </label>
    </form>
  )
}

export default SearchForm