import { describe, it, expect } from 'vitest'
import { loginShema } from '../authSchema'

const base = { email: 'user@example.com', password: 'StrongP@ss1' }

describe('loginShema', () => {
  it('accepts a valid email and strong password', () => {
    const result = loginShema.safeParse(base)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginShema.safeParse({ ...base, email: 'wrong' })
    expect(result.success).toBe(false)
  })

  it('rejects weak password', () => {
    const result = loginShema.safeParse({ ...base, password: 'weak' })
    expect(result.success).toBe(false)
  })
})
