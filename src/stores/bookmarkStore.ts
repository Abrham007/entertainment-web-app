import { getBookmarks } from "@/actions/bookmarks-actions";
import { ShowSchema } from "@/validation/tmbdSchema";
import { create } from "zustand";

type BookmarkStore = {
  bookmarks: Array<ShowSchema>;
  addBookmarks: (show: Array<ShowSchema>) => void;
  removeBookmark: (showId: number) => void;
  populateBookmarks: (bookmarks: Array<ShowSchema>) => Promise<void>;
};

export const useBookmarkStore = create<BookmarkStore>()((set) => ({
  bookmarks: [],
  addBookmarks: (shows) => {
    set((state) => ({ bookmarks: [...state.bookmarks, ...shows] }));
  },
  populateBookmarks: async (bookmarks: Array<ShowSchema>) => {
    if (!!bookmarks.length) {
      return;
    }

    const dbBookmarks = await getBookmarks();
    set((state) => {
      if (!state.bookmarks.length) {
        return { bookmarks: dbBookmarks };
      }

      return { bookmarks: state.bookmarks };
    });
  },
  removeBookmark: (showId) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== showId),
    }));
  },
}));
