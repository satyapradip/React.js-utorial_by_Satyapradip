# 🎯 API Calling Practice Exercises

Complete these exercises to master API calls in React! Start from Beginner and work your way up.

---

## 🟢 Beginner Level

### Exercise 1: Display Todo List

**Goal:** Fetch and display a list of todos

**API:** `https://jsonplaceholder.typicode.com/todos`

**Requirements:**

- Fetch todos on button click
- Display title of first 10 todos
- Show loading state while fetching
- Handle errors gracefully

**Hint:**

```javascript
const [todos, setTodos] = useState([]);
// Use axios.get() and map through todos
```

---

### Exercise 2: Show User Cards

**Goal:** Create cards for users

**API:** `https://jsonplaceholder.typicode.com/users`

**Requirements:**

- Fetch on component mount
- Display each user in a card with name, email, and company
- Add loading spinner
- Style cards with colors

---

### Exercise 3: Random Dog Images

**Goal:** Build a random dog image generator

**API:** `https://dog.ceo/api/breeds/image/random`

**Requirements:**

- "Get Random Dog" button
- Display new dog image on each click
- Add loading state
- Center the image on page

---

### Exercise 4: Comments Display

**Goal:** Show comments for a specific post

**API:** `https://jsonplaceholder.typicode.com/comments?postId=1`

**Requirements:**

- Fetch comments for post ID 1
- Display name, email, and comment body
- Fetch automatically on mount
- Show total comment count

---

## 🟡 Intermediate Level

### Exercise 5: Todo Filter

**Goal:** Filter todos by completion status

**API:** `https://jsonplaceholder.typicode.com/todos`

**Requirements:**

- Fetch all todos
- Add "All", "Completed", "Incomplete" buttons
- Filter todos based on selected option
- Show count for each category

**Hint:**

```javascript
const [filter, setFilter] = useState("all");
const filteredTodos = todos.filter((todo) => {
  if (filter === "completed") return todo.completed;
  if (filter === "incomplete") return !todo.completed;
  return true;
});
```

---

### Exercise 6: User Post Viewer

**Goal:** Select a user and view their posts

**API:**

- Users: `https://jsonplaceholder.typicode.com/users`
- Posts: `https://jsonplaceholder.typicode.com/posts?userId={id}`

**Requirements:**

- Dropdown to select user
- Fetch and display that user's posts when selected
- Show user info above posts
- Handle loading for both API calls

---

### Exercise 7: Search Products

**Goal:** Build a product search

**API:** `https://dummyjson.com/products/search?q={query}`

**Requirements:**

- Search input with debouncing (500ms)
- Display product results with image, title, price
- Show "No results" message when empty
- Add loading indicator during search

---

### Exercise 8: Pagination

**Goal:** Implement paginated user list

**API:** `https://jsonplaceholder.typicode.com/users`

**Requirements:**

- Show 3 users per page
- "Previous" and "Next" buttons
- Display current page number
- Disable buttons at boundaries

**Hint:**

```javascript
const [page, setPage] = useState(1);
const itemsPerPage = 3;
const startIndex = (page - 1) * itemsPerPage;
const displayedUsers = users.slice(startIndex, startIndex + itemsPerPage);
```

---

### Exercise 9: Photo Album

**Goal:** Click a user to see their photo album

**API:**

- Users: `https://jsonplaceholder.typicode.com/users`
- Albums: `https://jsonplaceholder.typicode.com/albums?userId={id}`
- Photos: `https://jsonplaceholder.typicode.com/photos?albumId={id}`

**Requirements:**

- List users
- Click user → show their albums
- Click album → show photos in a grid
- Breadcrumb navigation

---

## 🔴 Advanced Level

### Exercise 10: CRUD Todo App

**Goal:** Full Create, Read, Update, Delete functionality

**API:** `https://jsonplaceholder.typicode.com/todos`

**Requirements:**

- Display all todos
- Add new todo (POST)
- Toggle completion status (PATCH)
- Delete todo (DELETE)
- All operations with loading states

**Note:** JSONPlaceholder is a fake API, so changes won't persist. It still returns proper responses!

---

### Exercise 11: Custom useFetch Hook

**Goal:** Create a reusable fetch hook

**Requirements:**

- Create `hooks/useFetch.js`
- Returns `{ data, loading, error, refetch }`
- Works with any URL
- Use it in multiple components

**Starter Code:**

```javascript
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your implementation here

  return { data, loading, error, refetch };
};
```

---

### Exercise 12: Infinite Scroll

**Goal:** Load more items as user scrolls

**API:** `https://jsonplaceholder.typicode.com/photos?_page={page}&_limit=10`

**Requirements:**

- Load 10 photos initially
- Detect when user scrolls to bottom
- Automatically load next page
- Show loading spinner at bottom

**Hint:**

```javascript
useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadMore();
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

---

### Exercise 13: Multi-API Dashboard

**Goal:** Combine data from multiple APIs

**APIs:**

- Users: `https://jsonplaceholder.typicode.com/users/{id}`
- Posts: `https://jsonplaceholder.typicode.com/posts?userId={id}`
- Todos: `https://jsonplaceholder.typicode.com/todos?userId={id}`

**Requirements:**

- Select a user
- Show user profile, their posts count, and todos count
- Use Promise.all to fetch in parallel
- Handle loading for all requests together

**Hint:**

```javascript
const fetchUserDashboard = async (userId) => {
  const [user, posts, todos] = await Promise.all([
    axios.get(`/users/${userId}`),
    axios.get(`/posts?userId=${userId}`),
    axios.get(`/todos?userId=${userId}`),
  ]);
  // Use the data
};
```

---

### Exercise 14: Real-time Search

**Goal:** Search with instant results

**API:** `https://dummyjson.com/products/search?q={query}`

**Requirements:**

- Search as user types (debounced)
- Highlight search term in results
- Show search suggestions dropdown
- Cancel previous requests when new search starts

---

### Exercise 15: Weather App

**Goal:** Build a weather application

**API:** OpenWeatherMap API (requires free API key from openweathermap.org)

**Requirements:**

- Search by city name
- Display temperature, weather description, icon
- Show 5-day forecast
- Save recent searches to localStorage
- Handle API errors (invalid city, network issues)

---

## 🏆 Challenge Projects

### Project 1: Movie Search App

**API:** OMDB API (free key required)

- Search movies
- Display poster, title, year, rating
- Click for detailed view
- Pagination or infinite scroll
- Favorites list

### Project 2: E-commerce Product Catalog

**API:** `https://dummyjson.com/products`

- Product listing with images
- Category filter
- Price range filter
- Search functionality
- Add to cart (state management)
- Product detail page

### Project 3: Social Media Dashboard

**API:** JSONPlaceholder

- User profiles
- Posts feed
- Comments on posts
- Create new post
- Like/Unlike functionality
- User search

---

## ✅ Success Criteria

For each exercise, make sure you:

1. ✅ Handle loading state
2. ✅ Handle error state
3. ✅ Use try-catch blocks
4. ✅ Display data cleanly
5. ✅ Add proper styling
6. ✅ Test in browser
7. ✅ Check Network tab in DevTools

---

## 📝 Submission Checklist

When you complete an exercise:

- [ ] Code is clean and readable
- [ ] No console errors
- [ ] Loading states work
- [ ] Error handling implemented
- [ ] Responsive design (bonus)
- [ ] Comments explaining logic

---

## 🎓 Learning Path

1. **Week 1:** Complete all Beginner exercises
2. **Week 2:** Complete all Intermediate exercises
3. **Week 3:** Complete all Advanced exercises
4. **Week 4:** Build one Challenge Project

---

## 💡 Tips for Success

1. **Start Simple:** Begin with the beginner exercises
2. **Read Documentation:** Check API docs before starting
3. **Console Everything:** Use console.log to understand data structure
4. **Use DevTools:** Network tab is your best friend
5. **Break It Down:** Solve one requirement at a time
6. **Ask for Help:** Search Stack Overflow or ask ChatGPT
7. **Celebrate Wins:** Each completed exercise is progress!

---

## 📚 Resources

- **JSONPlaceholder:** https://jsonplaceholder.typicode.com
- **DummyJSON:** https://dummyjson.com
- **Dog API:** https://dog.ceo/dog-api
- **Axios Docs:** https://axios-http.com
- **React Docs:** https://react.dev

---

**Remember:** The goal is not to finish fast, but to **understand** each concept. Take your time, experiment, and have fun! 🚀
