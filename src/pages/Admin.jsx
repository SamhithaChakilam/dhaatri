import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { CATEGORIES } from '../config'

const empty = {
  name: '',
  category: 'Bangles',
  original_price: '',
  offer_price: '',
  description: '',
  product_code: '',
  sizes: '',
  featured: false
}

export default function Admin({ products, reload }) {
  const [session, setSession] = useState(null)
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [files, setFiles] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  // Supabase not connected
  if (!supabase) {
    return (
      <Shell>
        <p>
          Add your Supabase keys to <code>.env</code> to use the admin page.
        </p>
      </Shell>
    )
  }

  // Login page
  if (!session) {
    return (
      <Shell>
        <form
          className="mx-auto max-w-sm space-y-3"
          onSubmit={async (e) => {
            e.preventDefault()
            setMsg('Logging in…')

            const { error } = await supabase.auth.signInWithPassword(login)

            if (error) {
              setMsg(error.message)
            } else {
              setMsg('')
            }
          }}
        >
          <input
            className="input"
            type="email"
            placeholder="Email"
            required
            value={login.email}
            onChange={(e) =>
              setLogin({
                ...login,
                email: e.target.value
              })
            }
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            value={login.password}
            onChange={(e) =>
              setLogin({
                ...login,
                password: e.target.value
              })
            }
          />

          <button className="btn btn-gold w-full">
            Log in
          </button>

          {msg && (
            <p className="text-sm text-red-700">
              {msg}
            </p>
          )}
        </form>
      </Shell>
    )
  }

  // Form field handler
  const set = (key) => (e) => {
    setForm({
      ...form,
      [key]:
        e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.value
    })
  }

  // Reset form
  const reset = () => {
    setForm(empty)
    setEditId(null)
    setFiles([])
    setMsg('')
  }

  // Add / update product
  const save = async (e) => {
    e.preventDefault()
    setMsg('Saving…')

    // Basic offer-price validation
    if (
      form.offer_price !== '' &&
      form.original_price !== '' &&
      Number(form.offer_price) >= Number(form.original_price)
    ) {
      setMsg('Offer price must be lower than the actual price.')
      return
    }

    const row = {
      name: form.name,
      category: form.category,
      original_price:
        form.original_price === ''
          ? null
          : Number(form.original_price),
      offer_price:
        form.offer_price === ''
          ? null
          : Number(form.offer_price),
      description: form.description,
      product_code: form.product_code,
      sizes: form.sizes,
      featured: form.featured
    }

    let id = editId

    // Update existing product
    if (id) {
      const { error } = await supabase
        .from('products')
        .update(row)
        .eq('id', id)

      if (error) {
        setMsg(error.message)
        return
      }
    }

    // Add new product
    else {
      const {
        data,
        error
      } = await supabase
        .from('products')
        .insert(row)
        .select()
        .single()

      if (error) {
        setMsg(error.message)
        return
      }

      id = data.id
    }

    // Upload selected images
    for (const file of files) {
      const safeName = file.name.replace(/\s+/g, '_')

      const path = `${id}/${Date.now()}-${safeName}`

      const {
        error
      } = await supabase.storage
        .from('jewellery')
        .upload(path, file)

      if (error) {
        setMsg(error.message)
        return
      }

      const {
        data
      } = supabase.storage
        .from('jewellery')
        .getPublicUrl(path)

      const {
        error: imageError
      } = await supabase
        .from('product_images')
        .insert({
          product_id: id,
          image_url: data.publicUrl
        })

      if (imageError) {
        setMsg(imageError.message)
        return
      }
    }

    reset()
    setMsg('Saved ✓')
    reload()
  }

  // Edit product
  const edit = (p) => {
    setEditId(p.id)

    setForm({
      name: p.name,
      category: p.category,
      original_price: p.original_price ?? '',
      offer_price: p.offer_price ?? '',
      description: p.description ?? '',
      product_code: p.product_code ?? '',
      sizes: p.sizes ?? '',
      featured: !!p.featured
    })

    setFiles([])
    setMsg('')

    scrollTo(0, 0)
  }

  // Delete product
  const remove = async (p) => {
    if (!confirm(`Delete "${p.name}"?`)) {
      return
    }

    const {
      error
    } = await supabase
      .from('products')
      .delete()
      .eq('id', p.id)

    if (error) {
      setMsg(error.message)
      return
    }

    reload()
  }

  // Remove sample products from admin list
  const real = products.filter(
    (p) => !String(p.id).startsWith('s')
  )

  return (
    <Shell
      out={() => supabase.auth.signOut()}
    >
      <form
        onSubmit={save}
        className="grid gap-3 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2"
      >
        <h2 className="text-2xl font-semibold sm:col-span-2">
          {editId ? 'Edit product' : 'Add product'}
        </h2>

        {/* Product name */}
        <input
          className="input"
          placeholder="Product name"
          required
          value={form.name}
          onChange={set('name')}
        />

        {/* Category */}
        <select
          className="input"
          value={form.category}
          onChange={set('category')}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Actual price */}
        <input
          className="input"
          type="number"
          min="0"
          placeholder="Actual Price (₹)"
          value={form.original_price}
          onChange={set('original_price')}
        />

        {/* Offer price */}
        <input
          className="input"
          type="number"
          min="0"
          placeholder="Offer Price (₹) — optional"
          value={form.offer_price}
          onChange={set('offer_price')}
        />

        {/* Product code */}
        <input
          className="input"
          placeholder="Product code"
          value={form.product_code}
          onChange={set('product_code')}
        />

        {/* Sizes */}
        <input
          className="input sm:col-span-2"
          placeholder="Sizes (e.g. 2.4, 2.6, 2.8)"
          value={form.sizes}
          onChange={set('sizes')}
        />

        {/* Description */}
        <textarea
          className="input rounded-2xl sm:col-span-2"
          rows="3"
          placeholder="Description"
          value={form.description}
          onChange={set('description')}
        />

        {/* Photos */}
        <label className="text-sm sm:col-span-2">
          Photos (select several):
          <input
            className="mt-1 block"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setFiles([...e.target.files])
            }
          />
        </label>

        {/* Featured */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={set('featured')}
          />
          Featured on homepage
        </label>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button className="btn btn-gold">
            {editId ? 'Update' : 'Add product'}
          </button>

          {editId && (
            <button
              type="button"
              className="btn btn-line"
              onClick={reset}
            >
              Cancel
            </button>
          )}

          {msg && (
            <span className="self-center text-sm">
              {msg}
            </span>
          )}
        </div>
      </form>

      {/* Product list */}
      <h2 className="mb-3 mt-10 text-2xl font-semibold">
        Your products ({real.length})
      </h2>

      <ul className="divide-y divide-beige rounded-2xl bg-white">
        {real.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-3 p-3"
          >
            <img
              src={p.images?.[0]}
              alt=""
              className="h-14 w-12 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">
                {p.name}
                {p.featured && ' ★'}
              </p>

              <p className="text-xs text-cocoa/60">
                {p.category} · {p.product_code}
              </p>

              {/* Admin price display */}
              <p className="text-xs text-gold-dark">
                {p.offer_price != null ? (
                  <>
                    <span className="line-through">
                      ₹{Number(p.original_price).toLocaleString('en-IN')}
                    </span>
                    {' '}
                    <strong>
                      ₹{Number(p.offer_price).toLocaleString('en-IN')}
                    </strong>
                  </>
                ) : (
                  p.original_price != null &&
                  `₹${Number(p.original_price).toLocaleString('en-IN')}`
                )}
              </p>
            </div>

            <button
              type="button"
              className="text-sm text-gold-dark"
              onClick={() => edit(p)}
            >
              Edit
            </button>

            <button
              type="button"
              className="text-sm text-red-700"
              onClick={() => remove(p)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

const Shell = ({ children, out }) => (
  <div className="mx-auto max-w-3xl px-5 py-10">
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-semibold">
        Dhaatri Admin
      </h1>

      <div className="flex gap-4 text-sm">
        <a
          href="#/"
          className="text-gold-dark"
        >
          View site
        </a>

        {out && (
          <button onClick={out}>
            Log out
          </button>
        )}
      </div>
    </div>

    {children}
  </div>
)