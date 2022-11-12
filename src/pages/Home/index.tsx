import React from 'react'
import { Categories } from '@/components/Home/Categories'
import { CreateTask } from '@/components/Home/CreateTask'

export const Home: React.FC = () => {
  return (
    <div>
      <Categories />
      <CreateTask />
    </div>
  )
}
