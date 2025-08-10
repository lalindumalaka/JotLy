# Jotly - Daily Mood & Journal App

A full-stack MERN application that lets users log their daily mood and journal entries with beautiful visualizations and comprehensive CRUD operations.

## 🚀 Features

### Core Functionality
- **Daily Journal Entries**: Create, read, update, and delete journal entries
- **Mood Tracking**: 10 different mood emojis with visual selection
- **Rich Notes**: Write detailed notes with up to 1000 characters
- **Tag System**: Organize entries with custom tags
- **Date Management**: Track entries by specific dates

### Advanced Features
- **Mood Statistics**: Interactive charts using Chart.js (Bar and Doughnut views)
- **Search & Filtering**: Search by text, filter by mood, tags, and date ranges
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Real-time Updates**: Charts and data update automatically
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations

### Technical Features
- **Full CRUD API**: RESTful endpoints with proper error handling
- **MongoDB Integration**: Robust data persistence with Mongoose
- **State Management**: React Context for global state management
- **Async Operations**: Proper loading states and error handling
- **Responsive Charts**: Interactive data visualizations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 📁 Project Structure

```
jotly/
├── backend/                 # Backend server
│   ├── config/             # Database configuration
│   ├── middleware/         # Error handling middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React application
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── tailwind.config.js  # TailwindCSS configuration
│   └── package.json        # Frontend dependencies
├── package.json            # Root package.json
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jotly
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jotly
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update the URI to point to your MongoDB instance.

5. **Run the application**
   ```bash
   # Run both backend and frontend concurrently
   npm run dev
   
   # Or run them separately:
   npm run server    # Backend only (port 5000)
   npm run client    # Frontend only (port 3000)
   ```

### Development Commands

```bash
# Install dependencies
npm run install-all

# Run development servers
npm run dev

# Build frontend for production
npm run build

# Run only backend
npm run server

# Run only frontend
npm run client
```

## 📱 API Endpoints

### Entries
- `POST /api/entries` - Create new entry
- `GET /api/entries` - Get all entries (with optional filters)
- `GET /api/entries/:id` - Get single entry
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry

### Statistics
- `GET /api/entries/stats/mood` - Get mood distribution statistics
- `GET /api/entries/stats/date-range` - Get entries by date range

### Query Parameters
- `mood` - Filter by specific mood
- `tag` - Filter by specific tag
- `startDate` - Filter from date (YYYY-MM-DD)
- `endDate` - Filter to date (YYYY-MM-DD)

## 🎨 Features in Detail

### Dashboard
- Overview statistics (total entries, monthly entries, average)
- Mood distribution chart
- Recent entries preview
- Quick action buttons

### Entries Management
- List view with search and filtering
- Advanced filters (mood, tags, date range)
- Chart visualization toggle
- Responsive card layout

### Entry Forms
- Intuitive mood selection with emojis
- Rich text input for notes
- Dynamic tag management
- Form validation and error handling

### Data Visualization
- Interactive mood charts
- Multiple chart types (Bar, Doughnut)
- Real-time data updates
- Responsive chart layouts

## 🔧 Configuration

### Backend Configuration
- Database connection settings in `backend/config/db.js`
- Server port and environment variables
- CORS settings for cross-origin requests

### Frontend Configuration
- API base URL in `frontend/src/context/EntryContext.js`
- TailwindCSS customization in `tailwind.config.js`
- Chart.js configuration in components

## 🧪 Testing

### Manual Testing
1. **Backend API Testing**
   - Use Postman or similar tool to test all CRUD endpoints
   - Verify error handling and validation
   - Test filtering and search functionality

2. **Frontend Testing**
   - Test all CRUD operations end-to-end
   - Verify chart updates when data changes
   - Test responsive design on different screen sizes
   - Verify form validation and error handling

### Test Data
Create sample entries to test the application:
```json
{
  "date": "2024-01-15",
  "mood": "😊",
  "note": "Had a great day today! Met with friends and worked on some exciting projects.",
  "tags": ["friends", "work", "excited"]
}
```

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred hosting service
3. Ensure MongoDB connection is properly configured

### Frontend Deployment
1. Run `npm run build` to create production build
2. Deploy the `build` folder to your hosting service
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Verify MongoDB connection
3. Ensure all dependencies are installed
4. Check environment variable configuration

## 🎯 Future Enhancements

- [ ] User authentication and accounts
- [ ] Dark mode toggle
- [ ] Export functionality (JSON/PDF)
- [ ] Advanced analytics and insights
- [ ] Mobile app version
- [ ] Social sharing features
- [ ] Reminder notifications
- [ ] Multiple journal support

---

**Happy Journaling! 📖✨**
