import { describe, it, expect } from 'vitest'
import { registerSchema } from '../authSchema'

const baseData = {
  email: 'user@example.com',
  password: 'StrongP@ss1',
}

describe('registerSchema', () => {
  it('rejects when passwords do not match', () => {
    const result = registerSchema.safeParse({
      ...baseData,
      confirmPassword: 'WrongP@ss1',
    })
    expect(result.success).toBe(false)
  })

  it('accepts matching passwords', () => {
    const result = registerSchema.safeParse({
      ...baseData,
      confirmPassword: baseData.password,
    })
    expect(result.success).toBe(true)
  })
})
