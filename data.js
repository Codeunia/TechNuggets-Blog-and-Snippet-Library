const sampleNuggets = [
    {
        id: "1",
        title: "Quick React State Management with useReducer",
        description: "A practical example of using useReducer for complex state management in React applications.",
        content: `const initialState = { count: 0, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1, error: null };
    case 'decrement':
      return { ...state, count: state.count - 1, error: null };
    case 'error':
      return { ...state, error: action.message };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      {state.error && <p style={{color: 'red'}}>{state.error}</p>}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}`,
        language: "React",
        category: "Frontend",
        author: {
            name: "Sarah Chen"
        },
        readTime: 3,
        views: 1247,
        likes: 89,
        createdAt: "2 days ago",
        tags: ["React", "hooks", "state", "useReducer"],
        type: "snippet"
    },
    {
        id: "2",
        title: "Python List Comprehension Mastery",
        description: "Master Python list comprehensions with these practical examples and performance tips.",
        content: `# Basic list comprehension
numbers = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Nested list comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['python', 'list', 'comprehension']}

# Set comprehension
unique_remainders = {x % 3 for x in range(20)}

# Generator expression (memory efficient)
large_squares = (x**2 for x in range(1000000))`,
        language: "Python",
        category: "Backend",
        author: {
            name: "Alex Rodriguez"
        },
        readTime: 4,
        views: 2103,
        likes: 156,
        createdAt: "1 week ago",
        tags: ["Python", "comprehension", "optimization", "data-structures"],
        type: "snippet"
    },
    {
        id: "3",
        title: "CSS Grid vs Flexbox: When to Use What",
        description: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts.",
        content: `/* Use Flexbox for 1D layouts (row OR column) */
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Use Grid for 2D layouts (rows AND columns) */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}

/* Flexbox: Perfect for navigation bars */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid: Perfect for page layouts */
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}`,
        language: "CSS",
        category: "Frontend",
        author: {
            name: "Emma Thompson"
        },
        readTime: 6,
        views: 3456,
        likes: 234,
        createdAt: "3 days ago",
        tags: ["CSS", "layout", "grid", "flexbox", "responsive"],
        type: "article"
    },
    {
        id: "4",
        title: "Node.js Environment Variables Best Practices",
        description: "Secure and efficient ways to handle environment variables in Node.js applications.",
        content: `// .env file
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your-super-secret-key
NODE_ENV=development
PORT=3000

// config.js
require('dotenv').config();

const config = {
  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  }
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(\`Missing required environment variables: \${missingEnvVars.join(', ')}\`);
}

module.exports = config;`,
        language: "Node.js",
        category: "Backend",
        author: {
            name: "Michael Kim"
        },
        readTime: 5,
        views: 1876,
        likes: 142,
        createdAt: "5 days ago",
        tags: ["Node.js", "environment", "security", "configuration"],
        type: "snippet"
    },
    {
        id: "5",
        title: "TypeScript Utility Types Cheat Sheet",
        description: "Essential TypeScript utility types that will make your code more robust and maintainable.",
        content: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// Partial<T> - Makes all properties optional
type UserUpdate = Partial<User>;

// Pick<T, K> - Select specific properties
type UserProfile = Pick<User, 'id' | 'name' | 'email'>;

// Omit<T, K> - Exclude specific properties
type CreateUser = Omit<User, 'id'>;

// Required<T> - Makes all properties required
type RequiredUser = Required<Partial<User>>;

// Record<K, T> - Creates an object type with specific keys
type UserRoles = Record<'admin' | 'moderator' | 'user', string[]>;

// ReturnType<T> - Extract return type of a function
function getUser(): User { /* ... */ }
type UserReturnType = ReturnType<typeof getUser>; // User

// Parameters<T> - Extract parameter types
function updateUser(id: string, data: UserUpdate): void { /* ... */ }
type UpdateUserParams = Parameters<typeof updateUser>; // [string, UserUpdate]`,
        language: "TypeScript",
        category: "Frontend",
        author: {
            name: "David Park"
        },
        readTime: 4,
        views: 2987,
        likes: 198,
        createdAt: "1 day ago",
        tags: ["TypeScript", "types", "utility", "generics"],
        type: "snippet"
    },
    {
        id: "6",
        title: "Docker Multi-Stage Builds for Node.js",
        description: "Optimize your Docker images with multi-stage builds for better performance and security.",
        content: `# Multi-stage Dockerfile for Node.js
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]`,
        language: "Docker",
        category: "DevOps",
        author: {
            name: "Lisa Wang"
        },
        readTime: 3,
        views: 1654,
        likes: 87,
        createdAt: "4 days ago",
        tags: ["Docker", "Node.js", "optimization", "security"],
        type: "snippet"
    },
    {
        id: "7",
        title: "React Custom Hooks for API Calls",
        description: "Create reusable custom hooks for handling API requests with loading states and error handling.",
        content: `import { useState, useEffect } from 'react';

// Generic API hook
function useApi<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, refetch: () => fetchData() };
}

// Specific hook for users
function useUsers() {
  return useApi<User[]>('/api/users');
}

// Usage in component
function UserList() {
  const { data: users, loading, error } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
        language: "React",
        category: "Frontend",
        author: {
            name: "Tom Anderson"
        },
        readTime: 5,
        views: 3241,
        likes: 276,
        createdAt: "6 days ago",
        tags: ["React", "hooks", "API", "custom-hooks", "TypeScript"],
        type: "snippet"
    },
    {
        id: "8",
        title: "SQL Query Optimization Tips",
        description: "Essential techniques to optimize your SQL queries for better performance.",
        content: `-- Use indexes strategically
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_date ON orders(created_at);

-- Use EXPLAIN to analyze query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';

-- Avoid SELECT * - specify columns you need
SELECT id, name, email FROM users WHERE active = true;

-- Use WHERE clause to filter early
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2023-01-01'
GROUP BY u.id, u.name;

-- Use LIMIT for pagination
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 40;

-- Use EXISTS instead of IN for subqueries
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o 
  WHERE o.user_id = u.id 
  AND o.total > 100
);

-- Batch operations instead of multiple single operations
INSERT INTO products (name, price, category) VALUES
  ('Product 1', 29.99, 'Electronics'),
  ('Product 2', 49.99, 'Electronics'),
  ('Product 3', 19.99, 'Books');`,
        language: "SQL",
        category: "Database",
        author: {
            name: "Rachel Green"
        },
        readTime: 7,
        views: 2156,
        likes: 189,
        createdAt: "1 week ago",
        tags: ["SQL", "optimization", "performance", "database", "indexing"],
        type: "article"
    }
];

// Filter options
const languages = [
    "JavaScript", "TypeScript", "Python", "React", "Vue", "Angular",
    "Node.js", "PHP", "Java", "Go", "Rust", "Swift", "Kotlin", "CSS", "Docker", "SQL"
];

const categories = [
    "Frontend", "Backend", "DevOps", "Database", "APIs", "Testing",
    "Performance", "Security", "Mobile", "Web3", "AI/ML", "Tips"
];