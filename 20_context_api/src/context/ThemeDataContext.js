import { createContext } from "react";

// ============================================
// 📌 STEP 1: CREATE THE CONTEXT (Separate File)
// ============================================
// Best Practice: Keep createContext() in a separate file
// This helps with Fast Refresh in development!

export const ThemeDataContext = createContext();

// You can also set a default value (optional):
// export const ThemeDataContext = createContext({ theme: 'light', user: 'Guest' })
