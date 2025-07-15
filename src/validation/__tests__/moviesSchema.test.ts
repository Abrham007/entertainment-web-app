import { describe, it, expect } from 'vitest'
import { MovieApiResponseSchema } from '../moviesSchema'

const valid = {
  result: true,
  data: [
    {
      id: 1,
      orig_title: 'title',
      imdb_id: 'imdb1',
      tmdbid: 'tmdb1',
      year: 2024,
      quality: 'HD',
      type: 'movie',
      featured: false,
      slider: false,
      update: false,
      credits: 'c',
      last_update: 'now'
    }
  ],
  current_page: 1,
  from: 1,
  to: 1,
  per_page: 1,
  last_page: 1,
  first_page_url: 'https://example.com',
  next_page_url: null,
  prev_page_url: null,
  path: 'https://example.com',
  total: 1,
  total_count: 1
}

describe('MovieApiResponseSchema', () => {
  it('parses a valid response', () => {
    expect(MovieApiResponseSchema.parse(valid)).toBeTruthy()
  })

  it('fails for invalid data', () => {
    const invalid = { ...valid, data: [{ ...valid.data[0], id: 'a' }] }
    expect(() => MovieApiResponseSchema.parse(invalid)).toThrow()
  })
})
