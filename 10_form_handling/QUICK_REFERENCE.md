# 🚀 Form Handling Quick Reference Card

## 📌 Basic Pattern - Controlled Component

```jsx
const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

---

## 📌 Multiple Fields Pattern

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

<input name="name" value={formData.name} onChange={handleChange} />
<input name="email" value={formData.email} onChange={handleChange} />
```

---

## 📌 Different Input Types

### Text Input

```jsx
<input
  type="text"
  name="username"
  value={formData.username}
  onChange={handleChange}
/>
```

### Checkbox (Single)

```jsx
const [checked, setChecked] = useState(false);

<input
  type="checkbox"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>;
```

### Checkbox (Multiple)

```jsx
const [hobbies, setHobbies] = useState([]);

const handleCheckbox = (e) => {
  const { value, checked } = e.target;
  setHobbies((prev) =>
    checked ? [...prev, value] : prev.filter((h) => h !== value)
  );
};

<input
  type="checkbox"
  value="reading"
  checked={hobbies.includes("reading")}
  onChange={handleCheckbox}
/>;
```

### Radio Buttons

```jsx
const [gender, setGender] = useState("");

<input
  type="radio"
  name="gender"
  value="male"
  checked={gender === "male"}
  onChange={(e) => setGender(e.target.value)}
/>;
```

### Select Dropdown

```jsx
const [country, setCountry] = useState("USA");

<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="USA">USA</option>
  <option value="UK">UK</option>
</select>;
```

### Textarea

```jsx
const [bio, setBio] = useState("");

<textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="4" />;
```

---

## 📌 Form Submission

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // ⚠️ ALWAYS DO THIS!

  // Validate
  if (!formData.email) {
    alert("Email required");
    return;
  }

  // Submit
  console.log(formData);
  // or: await fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
};

<form onSubmit={handleSubmit}>
  {/* inputs */}
  <button type="submit">Submit</button>
</form>;
```

---

## 📌 Validation Pattern

```jsx
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email";
  }

  if (formData.password.length < 6) {
    newErrors.password = "Too short";
  }

  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // Submit...
};

// In JSX:
{
  errors.email && <span>{errors.email}</span>;
}
```

---

## 📌 Common Validation Regex

```jsx
// Email
/\S+@\S+\.\S+/.test(email)

// Phone (10 digits)
/^\d{10}$/.test(phone)

// URL
/^https?:\/\/.+/.test(url)

// Only letters
/^[A-Za-z]+$/.test(name)

// Alphanumeric
/^[A-Za-z0-9]+$/.test(username)
```

---

## 📌 File Upload

```jsx
const [file, setFile] = useState(null);

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("file", file);

  // Upload: fetch('/upload', { method: 'POST', body: formData })
};

<input type="file" onChange={handleFileChange} />;
```

---

## 📌 Debouncing (for Search)

```jsx
const [searchTerm, setSearchTerm] = useState("");
const [debouncedValue, setDebouncedValue] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedValue(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);

useEffect(() => {
  if (debouncedValue) {
    // Make API call
    console.log("Searching:", debouncedValue);
  }
}, [debouncedValue]);

<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
```

---

## 📌 Dynamic Fields

```jsx
const [fields, setFields] = useState([{ id: 1, value: "" }]);

const addField = () => {
  setFields([...fields, { id: Date.now(), value: "" }]);
};

const removeField = (id) => {
  setFields(fields.filter((f) => f.id !== id));
};

const handleChange = (id, value) => {
  setFields(fields.map((f) => (f.id === id ? { ...f, value } : f)));
};

{
  fields.map((field) => (
    <div key={field.id}>
      <input
        value={field.value}
        onChange={(e) => handleChange(field.id, e.target.value)}
      />
      <button onClick={() => removeField(field.id)}>Remove</button>
    </div>
  ));
}
<button onClick={addField}>Add</button>;
```

---

## 📌 Custom Hook (Reusable)

```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, setErrors, resetForm };
}

// Usage:
const { values, handleChange, resetForm } = useForm({
  email: "",
  password: "",
});
```

---

## 📌 Common Mistakes to Avoid

❌ **Forgetting e.preventDefault()**

```jsx
// BAD
const handleSubmit = (e) => {
  console.log(formData); // Page will reload!
};

// GOOD
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};
```

❌ **Not using 'name' attribute**

```jsx
// BAD
<input value={formData.email} onChange={handleChange} />

// GOOD
<input name="email" value={formData.email} onChange={handleChange} />
```

❌ **Mutating state directly**

```jsx
// BAD
formData.email = "new@email.com";
setFormData(formData);

// GOOD
setFormData((prev) => ({ ...prev, email: "new@email.com" }));
```

❌ **Wrong checkbox handling**

```jsx
// BAD for checkbox
onChange={(e) => setValue(e.target.value)}

// GOOD for checkbox
onChange={(e) => setValue(e.target.checked)}
```

---

## 📌 Best Practices Checklist

✅ Always use `e.preventDefault()` in form submission  
✅ Use controlled components for better control  
✅ Add `name` attribute to all inputs  
✅ Validate on submit, show errors clearly  
✅ Clear errors as user types  
✅ Use appropriate input types (`email`, `number`, `date`)  
✅ Add loading states for async submissions  
✅ Provide good user feedback (success/error messages)  
✅ Use labels for accessibility  
✅ Disable submit button while submitting

---

## 📌 Quick Debugging Tips

**Input not updating?**

- Check if `value` prop is set
- Check if `onChange` is defined
- Check if `name` attribute matches state key

**Form submitting but page reloads?**

- Add `e.preventDefault()` in handleSubmit

**Checkbox not working?**

- Use `e.target.checked` instead of `e.target.value`
- Use `checked` prop instead of `value`

**Values not saving?**

- Check `name` attribute
- Check if you're using spread operator: `...prev`
- Console.log the values to debug

---

## 🎓 Learning Progression

1. ✅ Master simple controlled inputs
2. ✅ Practice multiple field forms
3. ✅ Add validation
4. ✅ Handle all input types
5. ✅ Build a custom hook
6. ✅ Learn advanced patterns (debouncing, multi-step, dynamic)
7. ✅ Build real projects!

---

**💡 Pro Tip:** Start simple and add complexity only when needed. The best code is the simplest code that works!

---

Happy coding! 🚀
