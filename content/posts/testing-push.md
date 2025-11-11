---
title: "Testing Cloudflare Deployment"
date: 2025-11-11
status: published
description: "Testing automatic deployment and updates on Cloudflare Pages with this dummy post."
author: "Wong Ju Wei"
slug: "testing-push"
---

# Testing Cloudflare Deployment

This is a test post to verify that Cloudflare Pages automatically rebuilds and deploys when I push changes to the repository.

## What I'm Testing

1. **Automatic Build Trigger**: Does pushing to GitHub trigger a new build?
2. **Build Success**: Does the static site generator run without errors?
3. **Content Update**: Does the new content appear on the live site?
4. **Cache Invalidation**: How quickly do changes appear?

## The Deployment Process

When I push to GitHub, Cloudflare Pages should:

- Detect the commit
- Clone the repository
- Run `npm install`
- Execute `npm run build`
- Deploy the `/public` folder
- Serve the updated site

## Expected Results

✅ New post appears in blog index  
✅ Individual post page is accessible  
✅ Dark mode works correctly  
✅ Navigation is functional  
✅ CSS styles are applied  
✅ All links work properly  

## Timestamp

This post was created on **November 11, 2025** to test the CI/CD pipeline.

If you're reading this on the live site, it means the deployment was successful! 🎉

## Technical Details

- **Repository**: w-juwei/AI-Course
- **Branch**: master
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Platform**: Cloudflare Pages

## Next Steps

After confirming this works:
- Monitor build times
- Check for any deployment errors
- Verify all pages render correctly
- Test responsive design on mobile

---

*This is a test post and may be updated or removed later.*

