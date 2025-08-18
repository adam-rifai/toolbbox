# Toolbox - All-in-One Utility Tools

A modern, responsive toolbox website with 11 essential utilities, all client-side with no backend required.

## Tools Included

1. **QR Code Generator** - Create scannable QR codes from text or URLs
2. **Password Generator** - Generate secure passwords with customizable options
3. **Calendar** - Interactive monthly calendar with navigation
4. **Calculator** - Basic arithmetic calculator for quick calculations
5. **Unit Converter** - Convert between different units of measurement (length, weight, temperature)
6. **Text Case Converter** - Convert text between different cases (upper, lower, title, sentence)
7. **Timer/Stopwatch** - Countdown timer and stopwatch for time tracking
8. **Color Picker** - Select colors and get their hex/RGB values
9. **Base64 Encoder/Decoder** - Encode text to Base64 or decode Base64 to text
10. **Word/Character Counter** - Count words, characters, and sentences in your text

## Features

- **Fully Client-Side**: All processing happens in your browser, no data is sent to any server
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimalist design with smooth animations
- **No Installation Required**: Just open in any modern browser
- **Search & Filter**: Quickly find tools by name or category

## Pages

- **Home**: Grid view of all tools with search and category filtering
- **About**: Information about the toolbox and list of all tools
- **Contact**: Simple form for feedback and support email

## Deployment Instructions

### GitHub Pages Deployment

1. Create a new repository on GitHub (or use an existing one)
2. Upload all files (`index.html`, `about.html`, `contact.html`, `styles.css`, `script.js`, `README.md`) to the repository
3. Go to Repository Settings
4. Scroll down to the "Pages" section
5. Under "Source", select "Deploy from a branch"
6. Select the branch (usually "main" or "master") and folder ("/ (root)")
7. Click "Save"
8. Your site will be available at `https://[username].github.io/[repository-name]/`

### Local Testing

1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. All tools should work immediately with no setup required

### Custom Domain (Optional)

1. In your GitHub repository, create a file named `CNAME` in the root directory
2. Add your custom domain name as the only content of the file (e.g., `toolbox.yourdomain.com`)
3. Configure your domain's DNS settings to point to your GitHub Pages site
4. In GitHub repository settings, add your custom domain in the Pages section

## Technical Details

- **No Dependencies**: Works with vanilla HTML, CSS, and JavaScript
- **Lightweight**: No external libraries or frameworks
- **Cross-Browser Compatible**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Accessibility**: Semantic HTML and keyboard navigation support

## File Structure

```
toolbox-website/
├── index.html          # Homepage with tools grid
├── about.html          # About page with tool descriptions
├── contact.html        # Contact page with form
├── styles.css          # All styling for the website
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

This is a static website project. Feel free to fork and modify for your own use.

## License

This project is open source and available under the MIT License.
