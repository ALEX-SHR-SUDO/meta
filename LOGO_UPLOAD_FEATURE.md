# Logo Upload and Preview Feature

## Overview

The SPL Token Creator includes a user-friendly logo upload feature with real-time preview, inspired by oreontools.io.

## Feature Details

### Location
- Component: `frontend/components/TokenCreator.tsx`
- Lines: 38-48 (upload handler), 223-241 (UI)

### Functionality

1. **File Selection**
   - Users can click the upload area to browse for an image file
   - Accepts all image formats (`accept="image/*"`)
   - File input is hidden for better UX

2. **Real-time Preview**
   - As soon as a file is selected, a preview is generated
   - Preview uses FileReader API to create a data URL
   - Image appears immediately without uploading

3. **Preview Display**
   - Shows in a 80x80px rounded container
   - Positioned to the left of the file selector
   - Has a subtle white border for better visibility
   - Uses object-cover to maintain aspect ratio

4. **Visual Design**
   - Clean, modern glassmorphism design
   - Matches the overall purple/blue gradient theme
   - Smooth transitions on hover states
   - Displays filename when selected

## Code Implementation

### State Management
```typescript
const [logoFile, setLogoFile] = useState<File | null>(null);
const [logoPreview, setLogoPreview] = useState<string>('');
```

### Upload Handler
```typescript
const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
```

### UI Structure
```tsx
<div className="flex items-center space-x-4">
  {logoPreview && (
    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white/20">
      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
    </div>
  )}
  <label className="flex-1 cursor-pointer">
    <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors text-center">
      {logoFile ? logoFile.name : 'Choose file'}
    </div>
    <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} className="hidden" required />
  </label>
</div>
```

## User Experience Flow

1. User clicks on the "Choose file" button
2. File picker dialog opens
3. User selects an image file
4. Preview appears immediately on the left
5. Filename is displayed in the button
6. User can see exactly how their logo will look
7. Upload to IPFS happens when they click "Create Token"

## Inspiration from oreontools.io

Similar to oreontools.io, this implementation provides:
- ✅ Instant visual feedback
- ✅ Clean, modern UI design
- ✅ No unnecessary steps
- ✅ Clear indication of selected file
- ✅ Preview before final submission

## Benefits

- **Immediate Feedback**: Users see their logo right away
- **Error Prevention**: Can verify the correct file was selected
- **Better UX**: No waiting for upload to see the result
- **Professional**: Matches modern web application standards
- **Accessible**: Clear labels and feedback for all users
