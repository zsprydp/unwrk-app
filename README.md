# UnWrk - Focus Timer

Do less, achieve more.

## 🚀 GitHub Pages Deployment

### Step 1: Create New Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it: `unwrk-app`
3. Make it **Public**
4. ✅ Initialize with README
5. Click **Create repository**

### Step 2: Upload Files
1. Click **Add file** → **Upload files**
2. Drag and drop all these files:
   - index.html
   - manifest.json
   - service-worker.js
   - icon-192.png
   - icon-512.png
   - README.md
3. Commit changes

### Step 3: Enable GitHub Pages
1. Go to **Settings** tab
2. Click **Pages** in sidebar
3. Under "Source", select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**
5. Wait 2-3 minutes

### Step 4: Access Your App
Your app will be live at:
```
https://YOUR-USERNAME.github.io/unwrk-app/
```

### Step 5 (Optional): Custom Domain
To use `app.sprydp.com`:

1. In your repo settings → Pages → Custom domain
2. Enter: `app.sprydp.com`
3. In your domain DNS settings (where you manage sprydp.com), add:
   ```
   Type: CNAME
   Name: app
   Value: YOUR-USERNAME.github.io
   ```
4. Wait for DNS propagation (5-30 minutes)
5. ✅ Enable "Enforce HTTPS" in GitHub Pages settings

## 📱 PWA Features
- ✅ Install to home screen
- ✅ Works offline
- ✅ Full-screen mode
- ✅ Fast loading

## 🎯 What's Included
- **Free Tier**: Timer, White/Brown Noise, Meditation sounds
- **Premium ($4.99/mo)**: Binaural beats, Analytics, Goal tracking

## 🔧 Tech Stack
- React 18
- Tailwind CSS
- Web Audio API
- Service Workers (PWA)

## 📊 Next Steps
1. Deploy and test
2. Gather user feedback
3. Convert to React Native for app stores
4. Integrate real authentication & payments

---
Created for Spry Data Partners | [sprydp.com](https://sprydp.com)
