import { supabase } from '@/supabase'

type Itables = 'Categories' | 'Tasks' | 'Users'

export const getAllByColumns = async <T>(
  table: Itables,
  eq: { column: keyof T; value: T[keyof T] | null }[],
  order?: keyof T
) => {
  let query = supabase
    .from<T>(table)
    .select()
    .order(order ?? ('id' as keyof T))

  for (const value of eq) {
    if (value.value) {
      query = query.eq(value.column, value.value)
    }
  }
  const { data, error } = await query
  if (error) console.log(error)
  return data
}

export const getOneById = async <T>(table: Itables, id: T[keyof T]) => {
  const { data, error } = await supabase
    .from<T>(table)
    .select()
    .eq('id' as keyof T, id)
    .single()
  if (error) console.log(error)
  return data
}

export const createOne = async <T>(
  table: Itables,
  insertValues: Partial<T>
) => {
  const { data, error } = await supabase
    .from<T>(table)
    .insert(insertValues)
    .single()
  if (error) console.log(error)
  return data
}

export const updateOne = async <T>(
  table: Itables,
  updateValue: Partial<T>,
  id: T[keyof T]
) => {
  const { data, error } = await supabase
    .from<T>(table)
    .update(updateValue)
    .eq('id' as keyof T, id)
    .single()
  if (error) console.log(error)
  return data
}

export const deleteOne = async <T>(table: Itables, id: T[keyof T]) => {
  const { data, error } = await supabase
    .from<T>(table)
    .delete()
    .eq('id' as keyof T, id)
    .single()
  if (error) console.log(error)
  return data
}
