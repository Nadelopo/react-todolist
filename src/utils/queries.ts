import { supabase } from '@/supabase'

type Tables = 'Categories' | 'Tasks' | 'Users'

export const getAllByColumns = async <T>(
  table: Tables,
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

export const getOneById = async <T>(table: Tables, id: T[keyof T]) => {
  const { data, error } = await supabase
    .from<T>(table)
    .select()
    .eq('id' as keyof T, id)
    .single()
  if (error) console.log(error)
  return data
}

export const createOne = async <T>(table: Tables, insertValues: Partial<T>) => {
  const { data, error } = await supabase
    .from<T>(table)
    .insert(insertValues)
    .single()
  if (error) console.log(error)
  return data
}

export const updateOne = async <T>(
  table: Tables,
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

export const deleteOne = async <T>(table: Tables, id: T[keyof T]) => {
  const { data, error } = await supabase
    .from<T>(table)
    .delete()
    .eq('id' as keyof T, id)
    .single()
  if (error) console.log(error)
  return data
}
