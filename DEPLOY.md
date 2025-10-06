# Vercel Deployment Guide for NextPlot

## Quick Deploy to Vercel

### Method 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/nextplot-real-estate)

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

### Method 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the settings

## Configuration

The `vercel.json` file is already configured with:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: All routes redirect to `index.html`
- **Security Headers**: XSS protection, content type options
- **Caching**: Optimized for static assets

## Environment Variables

If you need environment variables, add them in the Vercel dashboard:

1. Go to your project dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Add your variables

## Custom Domain

To add a custom domain:

1. Go to your project dashboard
2. Click "Settings"
3. Click "Domains"
4. Add your domain and follow DNS instructions

## Performance Optimization

The application is optimized for Vercel with:

- ✅ Static file generation
- ✅ Automatic code splitting
- ✅ CDN distribution
- ✅ Image optimization ready
- ✅ Gzip compression
- ✅ Cache headers

## Monitoring

Monitor your deployment:

- **Analytics**: Available in Vercel dashboard
- **Real User Monitoring**: Built-in performance tracking
- **Error Tracking**: Console and network errors
- **Core Web Vitals**: Performance metrics

## Troubleshooting

### Build Issues

If build fails:
1. Check Node.js version (should be 18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and run `npm install`

### Route Issues

For SPA routing issues:
- Routes are configured in `vercel.json`
- All paths redirect to `index.html`
- Client-side routing handled by React

### Performance Issues

For performance optimization:
- Enable Edge Functions if needed
- Use Vercel Image Optimization
- Enable Edge Caching

## Deploy Status

After deployment, you'll get:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: For each git branch
- **Build Logs**: Detailed deployment information

Your NextPlot real estate platform is now live on Vercel! 🚀