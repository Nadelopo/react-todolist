import { Categories } from '@/components/Home/Categories'
import { CreateTask } from '@/components/Home/CreateTask'
import React from 'react'

export const Home = () => {
  return (
    <div>
      <Categories />
      <CreateTask />
    </div>
  )
}
