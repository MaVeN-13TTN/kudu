# KUDU - Premium Leather Goods E-commerce Store

A modern, luxury e-commerce storefront for handcrafted leather goods, built with React, TypeScript, and Tailwind CSS.

![KUDU Storefront](https://images.pexels.com/photos/1068766/pexels-photo-1068766.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🌟 Features

### Core E-commerce Functionality

- **Product Catalog** - Browse and filter premium leather goods
- **Shopping Cart** - Add, remove, and manage items with quantity controls
- **Wishlist** - Save favorite products for later
- **Search** - Advanced search with filtering and sorting options
- **User Authentication** - Login/register with social media integration
- **Checkout Process** - Multi-step checkout with shipping and payment options
- **Account Management** - Order history, addresses, and profile settings

### Modern UI/UX

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Micro-interactions** - Smooth animations and hover effects
- **Modern Typography** - Elegant serif headings with clean sans-serif body text
- **Premium Aesthetics** - Earthy color palette with luxury feel
- **Accessibility** - WCAG compliant with proper focus states and semantic HTML
- **Performance Optimized** - Fast loading with optimized images and lazy loading

### Pages Included

1. **Homepage** - Hero section, featured collections, story snippet
2. **Shop** - Product grid with advanced filtering and sorting
3. **Product Detail** - Image gallery, specifications, reviews
4. **Collections** - Curated product collections
5. **Our Story** - Brand narrative and values
6. **Gifts** - Gift recommendations and categories
7. **Contact** - Contact form and business information
8. **Search Results** - Dynamic search with suggestions
9. **Shopping Cart** - Cart management and order summary
10. **Checkout** - Multi-step purchase process
11. **Account** - User dashboard with order history
12. **Wishlist** - Saved items management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kudu
   ```

2. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### State Management

- **React Context** - Global state management for cart, wishlist, and user data
- **useReducer** - Complex state logic handling

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
kudu/
├── frontend/              # React frontend application
│   ├── src/              # Source code
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   ├── Footer.tsx      # Site footer
│   │   │   ├── ProductCard.tsx # Product display card
│   │   │   └── AuthForm.tsx    # Authentication forms
│   │   ├── contexts/     # React Context providers
│   │   │   └── AppContext.tsx  # Global app state
│   │   ├── data/         # Static data and mock content
│   │   │   └── products.ts    # Product catalog data
│   │   ├── pages/        # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ShopPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── StoryPage.tsx
│   │   │   ├── CollectionsPage.tsx
│   │   │   ├── GiftsPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── AccountPage.tsx
│   │   │   └── WishlistPage.tsx
│   │   ├── types/        # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── App.tsx       # Main app component
│   │   ├── main.tsx      # App entry point
│   │   └── index.css     # Global styles
│   ├── package.json      # Dependencies and scripts
│   ├── vite.config.ts    # Vite configuration
│   ├── tsconfig.json     # TypeScript configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── eslint.config.js  # ESLint configuration
│   └── index.html        # HTML entry point
└── README.md            # Project documentation
```

## 🎨 Design System

### Color Palette

- **Primary**: Amber-900 (#78350f) - Brand color for CTAs and accents
- **Secondary**: Gray tones for text and backgrounds
- **Accent**: Cream and beige tones for warmth
- **Success**: Green for positive actions
- **Warning**: Orange for alerts
- **Error**: Red for error states

### Typography

- **Headings**: Serif font for elegance and heritage
- **Body Text**: Sans-serif for readability
- **Font Sizes**: Responsive scaling from mobile to desktop

### Spacing

- **8px Grid System** - Consistent spacing throughout
- **Generous Whitespace** - Premium feel with breathing room
- **Responsive Breakpoints** - Mobile-first approach

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:

- Extended color palette
- Custom animations
- Additional utilities
- Responsive breakpoints

### Environment Variables

Create a `.env` file for environment-specific settings:

```env
VITE_API_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt fluidly across screen sizes with touch-friendly interactions on mobile devices.

## ♿ Accessibility

The application follows WCAG 2.1 guidelines:

- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **Screen Reader Support** - Semantic HTML and ARIA attributes
- **Color Contrast** - Sufficient contrast ratios throughout
- **Focus Management** - Clear focus indicators
- **Alternative Text** - Descriptive alt text for images

## 🚀 Performance

### Optimizations

- **Lazy Loading** - Images load as they enter viewport
- **Code Splitting** - Route-based code splitting with React Router
- **Optimized Images** - WebP format with fallbacks
- **Minified Assets** - Compressed CSS and JavaScript
- **Tree Shaking** - Unused code elimination

### Lighthouse Scores

Target scores for production:

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+

## 🧪 Testing

### Running Tests

```bash
cd frontend
npm run test
```

### Test Coverage

- Unit tests for components
- Integration tests for user flows
- E2E tests for critical paths

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel

1. Import project to Vercel
2. Configure build settings
3. Deploy with automatic previews

### Manual Deployment

1. Build the project: `cd frontend && npm run build`
2. Upload `frontend/dist` folder to your hosting provider
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add proper type definitions
- Include JSDoc comments for complex functions
- Ensure responsive design for all components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** - High-quality stock photography
- **Lucide** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework
- **React Community** - Amazing ecosystem and tools

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact: hello@kudu.com
- Documentation: [Project Wiki](wiki-url)

---

**KUDU** - Crafted with Heritage, Designed for Today
