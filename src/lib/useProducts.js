import { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabase'
import { sampleProducts } from './sampleProducts'

export function useProducts() {
  const [products, setProducts] = useState(supabase ? [] : sampleProducts)
  const [loading, setLoading] = useState(!!supabase)
  const reload = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('products').select('*, product_images(image_url)').order('created_at', { ascending: false })
    // Show sample products until the owner adds the first real one
    setProducts(data?.length ? data.map(p => ({ ...p, images: p.product_images.map(i => i.image_url) })) : sampleProducts)
    setLoading(false)
  }, [])
  useEffect(() => { reload() }, [reload])
  return { products, loading, reload }
}
