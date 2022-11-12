import React from 'react'
import { OverviewsTasks } from '@/components/Profile/OverviewsTasks'
import { CategoryManagement } from '@/components/Profile/CategoryManagement'

export const Profile: React.FC = () => {
  return (
    <div>
      <OverviewsTasks />
      <CategoryManagement />
    </div>
  )
}
