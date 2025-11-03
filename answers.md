### Question 1
***Have you worked with third-party camera/scanner SDKs before? Which ones?***
Worked with Digital Persona U.are.U 4500 Fingerprint Reader, Scandit.

***What's your approach to integrating a native module SDK like Scandit?***
- checking official documentation and quickstart.
- looking for RN wrapper/npm package.

***What are typical challenges when integrating commercial SDKs vs open-source libraries?***
- Licensing and restrictions.
- Less flexibility. SDK can't always be fixed, you have to interact with support.
- Size. Not all SDK functions can be needed.
- Documentation. It can be outdated.

### Question 2
**User bug report:** "Camera works on my friend's iPhone 15 but not on mine. Both have iOS 17.2."
- Compare app settings and app version.
- Check system permissions.
- Check iOS build (minor builds may differ).
- Check other apps are using the camera at the same time.
- Ask for logs/screenshots/videos.
- Check the device console via Xcode.
  
**Remote diagnostic tools:**
- Sentry
- TestFlight

### Question 3
**Describe your in-app purchase experience:**
- RevenueCat
- Implemented 3 apps with this approach
- Most challenging was processing chargebacks/refunds and related statuses.
- Server validation
- RevenueCat makes sync on start

### Question 4
RevenueCat will cover this problems.) It also has sandbox for testing.

### Question 5
- Sentry breadcrumbs + events
- Locally reproducing, fixing
- Checking frequency, affected releases, OS/version, devices, user count.
- Deploying fix to test environment, testing it for other issues affected by fix.
- Deploying fix to prod
- Checking Sentry regressions

### Question 6
- Release tracking + Source maps
- User context и tags
- Performance monitoring
- Breadcrumbs

### Question 7
Performance metrics: 
- Cold start / Warm start time.
- Screen-specific load time.
- CPU/Memory spikes
- Network latency

Tools:
- Sentry Performance
- Custom logging

Affected users:
  device model, RAM, OS version, geography, app version etc.

As usual Sentry and Firebase covers all issues, Grafana if nothing else helps.

### Question 8
For IOS
- Check specific device model, iOS version, and application build
- Ask user for detailed info, steps to reproduce, screenshots etc.
- Sentry Breadcrumbs and events
- Memory / CPU spikes
- iOS Simulator reproduce
- Checking Camera API changes between ios versions

