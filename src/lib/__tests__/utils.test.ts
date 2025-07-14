import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('combines class names with spaces', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('removes duplicates using twMerge', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
