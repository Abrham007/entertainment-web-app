import { getBookmarks } from "@/app/bookmarks/actions";
import { ShowSchema } from "@/validation/tmbdSchema";
import { create } from "zustand";

type bookmarkStore = {
  bookmarkes: Array<ShowSchema>;
  addBookmarks: (show: Array<ShowSchema>) => void;
  removeBookmark: (showId: number) => void;
  populateBookmarks: () => Promise<void>;
};

export const useBookmarkStore = create<bookmarkStore>()((set) => ({
  bookmarkes: [],
  addBookmarks: (shows) => {
    set((state) => ({ bookmarkes: [...state.bookmarkes, ...shows] }));
  },
  populateBookmarks: async () => {
    const dbBookmarks = await getBookmarks();

    set((state) => {
      if (!state.bookmarkes.length) {
        return { bookmarkes: dbBookmarks };
      }

      return { bookmarkes: state.bookmarkes };
    });
  },
  removeBookmark: (showId) => {
    set((state) => ({
      bookmarkes: state.bookmarkes.filter((bookmark) => bookmark.id !== showId),
    }));
  },
}));
