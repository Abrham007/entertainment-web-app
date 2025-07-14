import { describe, it, expect, vi, beforeEach } from 'vitest'
vi.mock('../../actions/bookmarks-actions', () => ({
  getBookmarks: vi.fn()
}))

import { useBookmarkStore } from '../bookmarkStore'
import { getBookmarks } from '../../actions/bookmarks-actions'

const show = { id: 1 } as any

beforeEach(() => {
  useBookmarkStore.setState({ bookmarks: [] })
  vi.restoreAllMocks()
})

describe('bookmarkStore', () => {
  it('adds and removes bookmarks', () => {
    useBookmarkStore.getState().addBookmarks([show])
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(1)

    useBookmarkStore.getState().removeBookmark(1)
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(0)
  })

  it('populates from actions when empty', async () => {
    (getBookmarks as unknown as any).mockResolvedValue([show])
    await useBookmarkStore.getState().populateBookmarks([])
    expect(useBookmarkStore.getState().bookmarks).toEqual([show])
  })

  it('does not repopulate if already populated', async () => {
    (getBookmarks as unknown as any).mockResolvedValue([show])
    useBookmarkStore.getState().addBookmarks([show])
    await useBookmarkStore.getState().populateBookmarks([])
    expect(getBookmarks).toHaveBeenCalled()
  })
})
