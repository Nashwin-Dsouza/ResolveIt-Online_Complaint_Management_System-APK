# JDK Configuration Fix Guide

## Problem
Android Studio is showing "Invalid Gradle JDK configuration found" and asking to use the Embedded JDK.

## Solution Applied

### 1. Updated gradle.properties
Added JDK configuration to use Android Studio's embedded JDK:
```properties
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```

## Manual Fix Steps

### Option 1: Android Studio Settings (Recommended)

1. **Open Android Studio**
2. **Go to File → Settings** (or Ctrl+Alt+S)
3. **Navigate to Build, Execution, Deployment → Build Tools → Gradle**
4. **Set "Gradle JDK" to "Embedded JDK"**
5. **Click Apply and OK**
6. **Sync project** (File → Sync Project with Gradle Files)

### Option 2: Command Line Fix

Run the updated fix script:
```bash
.\fix-gradle-simple.bat
```

### Option 3: Manual Gradle Properties

If the automatic fix doesn't work, manually edit `Client/android/gradle.properties`:

```properties
# Use Android Studio's embedded JDK
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr

# Increase memory for better performance
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

## Alternative JDK Paths

If the above path doesn't work, try these alternatives:

### Windows
```properties
# Option 1: Android Studio JBR
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr

# Option 2: Android Studio JRE
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jre

# Option 3: System JDK (if installed)
org.gradle.java.home=C:\\Program Files\\Java\\jdk-11.0.x
```

### macOS
```properties
org.gradle.java.home=/Applications/Android Studio.app/Contents/jbr/Contents/Home
```

### Linux
```properties
org.gradle.java.home=/opt/android-studio/jbr
```

## Verification Steps

1. **Check JDK Path**:
   ```bash
   cd Client\android
   gradlew.bat --version
   ```

2. **Clean and Rebuild**:
   ```bash
   gradlew.bat clean
   gradlew.bat build
   ```

3. **Test in Android Studio**:
   - Open project
   - Let it sync
   - Try building APK

## Common Issues

### Issue: "JDK not found at specified path"
**Solution**: 
1. Verify the path exists
2. Try alternative paths listed above
3. Install JDK 11 or 17 if needed

### Issue: "Permission denied"
**Solution**:
1. Run Android Studio as Administrator
2. Check file permissions
3. Use a different JDK path

### Issue: "Gradle daemon issues"
**Solution**:
```bash
gradlew.bat --stop
gradlew.bat --daemon
```

## Environment Variables (Optional)

You can also set JAVA_HOME environment variable:

### Windows
```cmd
set JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"
```

### macOS/Linux
```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

## Next Steps

1. **Apply the JDK fix**
2. **Sync project in Android Studio**
3. **Try building the APK**
4. **Test on your phone**

## Prevention

- Keep Android Studio updated
- Use the embedded JDK when possible
- Avoid mixing different JDK versions
- Regularly clean Gradle caches 