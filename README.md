# 🐙 GitHub Clone

A modern, responsive GitHub clone built with Next.js 15, TypeScript, and TailwindCSS. This application allows users to search for GitHub users and view detailed profiles with repositories, similar to the original GitHub experience.

## ✨ Features

### 🔍 User Search
- Search for GitHub users by username, location, or skills
- Real-time search results with GitHub API integration
- Responsive search interface with keyboard navigation support

### 👤 User Profiles
- Comprehensive user profile information
- User statistics (repositories, followers, following, gists)
- Profile details including location, company, blog, and social links
- Join date and last update information

### 📚 Repository Display
- List of user repositories with detailed information
- Repository metadata (language, stars, forks, last update)
- Fork status and privacy indicators
- Direct links to GitHub repositories

### 🎨 Modern UI/UX
- Dark theme with GitHub-inspired design
- Responsive layout for all device sizes
- Smooth animations and hover effects
- Professional typography and spacing

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **API**: GitHub REST API
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd github-clone
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Usage

### Searching for Users
1. Enter a search query in the search bar
2. Press Enter or click the Search button
3. Browse through the search results
4. Click on any user to view their detailed profile

### Viewing User Profiles
- **Profile Header**: Avatar, name, bio, and statistics
- **User Information**: Location, company, blog, social links
- **Repositories**: List of public repositories with metadata
- **Navigation**: Easy navigation back to search

## 🌐 API Integration

The application integrates with the GitHub REST API to fetch:
- User search results
- Individual user profiles
- User repositories
- Repository metadata

**Note**: The GitHub API has rate limits for unauthenticated requests (60 requests per hour for IP address). For production use, consider implementing GitHub OAuth authentication.

## 📱 Responsive Design

- **Mobile**: Optimized for small screens with stacked layouts
- **Tablet**: Adaptive grid layouts for medium screens
- **Desktop**: Full-featured interface with optimal spacing

## 🎯 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header with search
│   │   ├── Footer.tsx          # Site footer
│   │   └── LoadingSpinner.tsx  # Reusable loading component
│   ├── user/
│   │   └── [username]/
│   │       └── page.tsx        # User profile page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page with search
├── types/                      # TypeScript type definitions
└── utils/                      # Utility functions
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Environment Variables

Currently, the application uses the public GitHub API without authentication. For production use, you may want to add:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- GitHub for providing the excellent API
- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Lucide for the beautiful icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the existing documentation
- Review the code examples

---

**Happy coding! 🚀**
