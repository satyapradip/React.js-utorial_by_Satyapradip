# 🚀 API Calling in React - Complete Learning Project

Welcome to the most comprehensive guide to mastering API calls in React! This project contains everything you need to become proficient in fetching, sending, and managing data in React applications.

## 📚 What You'll Learn

- ✅ Making GET, POST, PUT, DELETE requests
- ✅ Using Fetch API and Axios
- ✅ Managing loading states and error handling
- ✅ useEffect and useState hooks for API calls
- ✅ Debouncing search inputs
- ✅ Creating custom hooks
- ✅ Request cancellation and cleanup
- ✅ Best practices and common patterns
- ✅ Real-world examples and use cases

## 🗂️ Project Structure

```
14_Api_calling/
├── src/
│   ├── App.jsx                    # Main app with navigation
│   └── components/
│       ├── BasicFetch.jsx         # Example 1: Button-triggered fetch
│       ├── FetchOnMount.jsx       # Example 2: Fetch on component mount
│       ├── DynamicFetch.jsx       # Example 3: Fetch with dependencies
│       ├── SearchWithDebounce.jsx # Example 4: Debounced search
│       ├── CreateData.jsx         # Example 5: POST request
│       ├── ImageGallery.jsx       # Example 6: Image API
│       └── CustomHookExample.jsx  # Example 7: Custom hooks
├── API_CALLING_GUIDE.md           # 📖 Complete theory guide
├── QUICK_REFERENCE.md             # ⚡ Quick code snippets
├── PRACTICE_EXERCISES.md          # 🎯 15+ hands-on exercises
└── README.md                      # 👈 You are here
```

## 🚦 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This installs React, Vite, and **Axios** (HTTP client library).

### 2. Run the Project

```bash
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`)

### 3. Explore the Examples

The app contains 7 interactive examples demonstrating different API calling patterns. Use the navigation tabs to explore each one!

## 📖 Learning Resources

### 1. **API_CALLING_GUIDE.md**

Complete theoretical guide covering:

- Core concepts and HTTP methods
- Fetch vs Axios comparison
- useState & useEffect patterns
- Loading states & error handling
- Best practices and advanced topics
- 20+ code examples

**Start here** if you're new to API calls!

### 2. **QUICK_REFERENCE.md**

Quick reference for experienced developers:

- Common code patterns
- All HTTP methods (GET, POST, PUT, DELETE)
- Error handling templates
- Custom hooks template
- Debugging tips
- Cheat sheet

**Use this** as a quick lookup while coding!

### 3. **PRACTICE_EXERCISES.md**

15+ hands-on exercises organized by difficulty:

- 🟢 **Beginner:** 4 exercises
- 🟡 **Intermediate:** 5 exercises
- 🔴 **Advanced:** 6 exercises
- 🏆 **Challenge Projects:** 3 full projects

**Practice here** to reinforce your learning!

## 🎯 7 Interactive Examples

### Example 1: Basic Fetch (Button Click)

Learn the fundamentals of making API calls with a button trigger.

- Manual fetch on button click
- Loading, error, and success states
- Displaying data in a list

### Example 2: Fetch on Component Mount

Understand automatic data fetching with useEffect.

- Fetch data when component loads
- useEffect with empty dependency array
- Conditional rendering based on states

### Example 3: Dynamic Fetch (Dependencies)

Master reactive API calls that respond to changes.

- Re-fetch when variables change
- useEffect dependency array
- Dropdown selection triggering new requests

### Example 4: Search with Debouncing

Build performant search features.

- Debouncing to reduce API calls
- Search as user types
- Cleanup functions in useEffect

### Example 5: POST Request (Form Submission)

Learn to send data to servers.

- Form handling
- POST requests with Axios
- Displaying API response

### Example 6: Image Gallery

Work with media APIs.

- Fetching and displaying images
- Grid layout
- Real API (Picsum Photos)

### Example 7: Custom Hook (Reusability)

Create reusable API logic.

- Custom `useFetch` hook
- Sharing logic across components
- Refactoring for cleaner code

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **JSONPlaceholder** - Practice API
- **Picsum Photos** - Image API

## 💡 Best Practices Covered

1. ✅ **Always handle errors** - Use try-catch blocks
2. ✅ **Show loading states** - Better user experience
3. ✅ **Clean up requests** - Prevent memory leaks
4. ✅ **Use custom hooks** - Reusable logic
5. ✅ **Debounce searches** - Reduce API calls
6. ✅ **Handle edge cases** - Empty results, network errors
7. ✅ **Use environment variables** - For API keys

## 🎓 Learning Path

### Week 1: Foundations

- [ ] Read API_CALLING_GUIDE.md (sections 1-5)
- [ ] Run the project and explore all 7 examples
- [ ] Complete Beginner exercises 1-4

### Week 2: Intermediate Concepts

- [ ] Read API_CALLING_GUIDE.md (sections 6-7)
- [ ] Study each example component's code
- [ ] Complete Intermediate exercises 5-9

### Week 3: Advanced Patterns

- [ ] Read about custom hooks and advanced topics
- [ ] Complete Advanced exercises 10-15
- [ ] Modify examples to add new features

### Week 4: Build Projects

- [ ] Choose one Challenge Project
- [ ] Build it from scratch
- [ ] Add your own features

## 🧪 How to Practice

1. **Explore Examples**: Run the app and interact with each example
2. **Read the Code**: Open component files and understand the logic
3. **Modify Code**: Change API URLs, add features, experiment
4. **Do Exercises**: Complete exercises from PRACTICE_EXERCISES.md
5. **Build Projects**: Create your own apps using these patterns

## 📝 Common APIs for Practice

| API             | URL                                       | Data                |
| --------------- | ----------------------------------------- | ------------------- |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com`    | Users, Posts, Todos |
| Picsum Photos   | `https://picsum.photos/v2/list`           | Random Images       |
| DummyJSON       | `https://dummyjson.com`                   | Products, Users     |
| Dog API         | `https://dog.ceo/api/breeds/image/random` | Dog Images          |
| Rick & Morty    | `https://rickandmortyapi.com/api`         | Characters          |

All these APIs are **free** and require **no API key**!

## 🐛 Debugging Tips

1. **Check Network Tab**: DevTools → Network → XHR/Fetch
2. **Console Log Everything**: Log responses to see data structure
3. **Check API Docs**: Verify endpoint URLs and parameters
4. **Test in Browser**: Visit API URL directly to see response
5. **Use try-catch**: Catch and log errors properly

## 🤔 Common Issues & Solutions

### Issue: CORS Error

**Solution**: Use a CORS proxy or enable CORS on your API

### Issue: Data is undefined

**Solution**: Check the API response structure with console.log

### Issue: Infinite loop in useEffect

**Solution**: Add proper dependencies to dependency array

### Issue: Component unmounted warning

**Solution**: Clean up requests with abort controller

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Axios Documentation](https://axios-http.com)
- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 🎯 Next Steps After Mastery

Once you're comfortable with these concepts:

1. **Learn React Query / TanStack Query** - Advanced data fetching
2. **Study SWR** - React hooks for data fetching
3. **Explore GraphQL** - Alternative to REST APIs
4. **Learn Authentication** - JWT tokens, OAuth
5. **Build Full-Stack Apps** - Connect to your own backend

## 🤝 Contributing

Feel free to:

- Add more examples
- Improve documentation
- Fix bugs
- Suggest new exercises

## 📄 License

This is an educational project. Feel free to use and modify for learning purposes!

---

## 🎉 Ready to Become an API Master?

Start by running the project, then dive into the examples and guides. Practice consistently, and you'll master API calls in React in no time!

**Happy Learning! 🚀**

---

### Quick Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Pro Tip**: Keep this README open while learning as your quick navigation guide!
