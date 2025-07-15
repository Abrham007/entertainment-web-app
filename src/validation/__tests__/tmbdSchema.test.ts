import { describe, it, expect } from 'vitest'
import { showSchema, VideosInfoSchema } from '../tmbdSchema'

const showData = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/b.jpg',
      id: 1,
      title: 'Movie',
      original_title: 'Movie',
      overview: 'desc',
      poster_path: '/p.jpg',
      media_type: 'movie',
      original_language: 'en',
      genre_ids: [1],
      popularity: 1,
      release_date: '2024-01-01',
      vote_average: 8,
      vote_count: 10
    }
  ],
  total_pages: 1,
  total_results: 1
}

describe('showSchema', () => {
  it('parses valid show data', () => {
    expect(showSchema.parse(showData)).toBeTruthy()
  })

  it('fails for wrong type', () => {
    const bad = { ...showData, results: [{ ...showData.results[0], id: 'x' }] }
    expect(() => showSchema.parse(bad)).toThrow()
  })
})

const videoInfo = {
  id: 1,
  results: [
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'trailer',
      key: 'abc',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
      official: true,
      published_at: '2024-01-01',
      id: 'vid1'
    }
  ]
}

describe('VideosInfoSchema', () => {
  it('parses valid video info', () => {
    expect(VideosInfoSchema.parse(videoInfo)).toBeTruthy()
  })

  it('fails for invalid entry', () => {
    const bad = { ...videoInfo, results: [{ ...videoInfo.results[0], size: 'x' }] }
    expect(() => VideosInfoSchema.parse(bad)).toThrow()
  })
})
