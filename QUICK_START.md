# Quick Setup Guide

## ⚡ Quick Start

### 1. Install Dependencies
```powershell
yarn install
```

### 2. Configure Environment
Before running the app, update the API URL in:
- `src/environments/environment.development.ts`
- `src/environments/environment.ts`

Change `apiUrl` to match your backend server:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:YOUR_PORT/api'  // Update this!
};
```

### 3. Start Development Server
```powershell
yarn start
```

The app will be available at `http://localhost:4200/`

## 🎯 First Steps

1. **Register an Account**
   - Navigate to `/auth/register`
   - Fill in: First Name, Last Name, Email, Password
   - Click "Create Account"

2. **Login**
   - Navigate to `/auth/login`
   - Enter your email and password
   - Click "Sign In"

3. **Explore the Dashboard**
   - View statistics
   - Use quick action cards to navigate

## 📋 Features to Test

### Events Management
- ✅ Create a new event
- ✅ Edit event details
- ✅ Search events
- ✅ Delete events
- ✅ View event list with pagination

### Customers Management
- ✅ View customer list
- ✅ Paginate through customers

### Bookings Management
- ✅ View all bookings
- ✅ Check booking status
- ✅ Delete bookings

### Ticket Types Management
- ✅ View ticket types
- ✅ See pricing information

## 🔧 Common Issues

### Issue: API connection fails
**Solution**: Check that:
1. Backend API is running
2. API URL in environment files is correct
3. CORS is configured on the backend

### Issue: Login fails
**Solution**: Ensure:
1. User is registered in the backend
2. Credentials are correct
3. Backend authentication endpoint is working

### Issue: 401 Unauthorized errors
**Solution**: 
1. Clear browser localStorage
2. Login again
3. Check token expiration time
**Note**: This project now uses sessionStorage for token storage. If you experience issues, clear `sessionStorage` in your browser's developer tools instead of `localStorage`.

## 🎨 Key Features

### Modern UI/UX
- Professional gradient design
- Smooth animations
- Responsive layout
- Intuitive navigation

### Security
- JWT token authentication
- Protected routes
- Automatic token refresh handling
- Secure password validation

### Performance
- Zoneless change detection
- Lazy loading
- Optimized builds
- Efficient state management with signals

## 📱 Responsive Testing

Test the app on different screen sizes:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🚀 Production Build

```powershell
yarn build
```

Build output will be in `dist/EventBooking-frontend/`

## 📊 Development Tips

1. **Hot Reload**: Any changes to files will automatically reload
2. **Chrome DevTools**: Use for debugging
3. **Network Tab**: Monitor API calls
4. **Console**: Check for errors or warnings

## ✅ Pre-deployment Checklist

- [ ] Update environment.ts with production API URL
- [ ] Test all features thoroughly
- [ ] Check responsive design on all devices
- [ ] Verify security (no tokens in console logs)
- [ ] Run production build successfully
- [ ] Test production build locally

## 🎓 Learning Resources

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Guide](https://sass-lang.com/guide)

## 💡 Tips

1. Keep the browser console open during development
2. Use Angular DevTools extension for debugging
3. Check Network tab for API responses
4. Review error messages carefully
5. Follow the code structure for new features

## 🆘 Getting Help

If you encounter issues:
1. Check console for errors
2. Verify API is running
3. Check environment configuration
4. Review the API_DOCUMENTATION.md
5. Check browser network requests

---

Happy coding! 🎉
