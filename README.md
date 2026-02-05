# ICHS Access & Engagement Redesign

A collaborative project to redesign the International Community Health Services (ICHS) website's Services page, focusing on improving patient engagement and user experience for non-English speakers and users with low digital literacy.

## Team
- Selma Link
- Riya Kulkarni
- Cindy Nguyen
- Shradha Shankar
- Nikhila Suneel

## Project Overview

### Problem Statement
ICHS's current website suffers from cluttered design and overwhelming user experience, leading to:
- Low patient engagement on service-related pages
- High volume of calls asking for information already available online
- Difficulty for non-English speakers and low digital literacy users to navigate services
- Increased burden on front desk representatives, providers, and call centers

### Solution
We are creating a comprehensive redesign of ICHS's Services page, including:
- Full design mockups and prototypes
- Functional code implementations demonstrating proposed changes
- Detailed technical specifications for ICHS's development team
- Clear implementation guidelines for their 2027 website redesign

### Target Audience
- Current and prospective ICHS patients
- Patients with limited English proficiency
- Users with low digital or health literacy
- ICHS staff and Community Access Specialists
- Donors and partners (indirectly)

## Features

### Must Have (P0)
- Navigable, intuitive service page with clear linguistic and navigation structure
- Functional code demonstrating redesigned Services page
- Accessibility features (WCAG 2.1 AA compliance)
- Responsive design for mobile and desktop

### Should Have (P1/P2)
- Multilingual features
- Location-based filtering
- Search functionality

## Technologies
- **Design**: Figma
- **Frontend**: HTML5, CSS3, JavaScript
- **Version Control**: GitHub
- **Documentation**: Markdown

## Repository Structure
```
ichs-services-redesign/
├── README.md                  # Project overview and documentation
├── LICENSE                    # Usage and permissions
├── src/                       # Source code for redesigned pages
├── designs/                   # Figma design files and exports
├── research/                  # User research findings and data
├── documentation/             # Project documentation and handoff materials
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code, Sublime Text, etc.)
- Basic understanding of HTML/CSS/JavaScript
- Git installed on your machine

### Installation

1. Clone the repository
```bash
   git clone https://github.com/your-username/ichs-services-redesign.git
```

2. Navigate to the project directory
```bash
   cd ichs-services-redesign
```

3. Open the project in your preferred code editor
```bash
   code .  # For VS Code
```

#### Option 1: Simple HTTP Server (Recommended)
```bash
# Navigate to the src directory
cd src

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx installed)
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

#### Option 2: Direct File Access
Simply open the HTML files in your web browser by double-clicking or using:
```bash
open src/index.html  # macOS
start src/index.html # Windows
xdg-open src/index.html # Linux
```

**Note:** Some features (like language switching or dynamic content) may require a local server to function properly.

## Contributing

### For Team Members

1. Create a new branch for your feature
```bash
   git checkout -b feature/your-feature-name
```

2. Make your changes and commit with clear messages
```bash
   git add .
   git commit -m "Add: descriptive message about your changes"
```

3. Push to your branch
```bash
   git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub for team review

### Commit Message Guidelines
- **Add**: New features or files
- **Update**: Changes to existing features
- **Fix**: Bug fixes
- **Docs**: Documentation updates
- **Style**: Formatting, missing semicolons, etc.
- **Refactor**: Code restructuring

### Code Standards
- Use semantic HTML5 elements
- Follow BEM naming convention for CSS classes
- Comment complex JavaScript functions
- Ensure all code is accessible (WCAG 2.1 AA)
- Test on multiple browsers and devices
- Keep code clean and well-organized

## Success Metrics

### Qualitative Indicators
- Patients can quickly identify available ICHS services
- Users can navigate without feeling overwhelmed
- Stakeholders confirm improved intuitiveness and patient-centeredness
- Code is maintainable and well-documented

### Quantitative Metrics (Post-Implementation by ICHS)
- Increased traffic to Services page
- Increased time on Services-related pages
- Reduced bounce rate on service entry points
- Increased click-throughs from landing page to Services
- Improved page load times
- Higher accessibility scores (Lighthouse, WAVE)

## Deliverables

1. **High-Fidelity Designs** - Figma mockups and prototypes
2. **Functional Code Implementation** - Fully coded Services page redesign
3. **Documentation** - Implementation guidelines and technical specifications
4. **Research & Validation** - User research findings and usability testing results

## Timeline
- **Current Phase**: Design, development, and prototyping
- **Spring Quarter 2025**: Handoff documentation and final delivery
- **ICHS Implementation**: 2027 website revamp

## License

This project is licensed under a custom license - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or additional information, please contact the project team through the GitHub repository issues.

## Acknowledgments

- International Community Health Services (ICHS) for partnership and guidance
- ICHS Community Access Specialists for user insights
- Project stakeholders and research participants
- All community members who contributed to user testing

---

**Note**: This is an active development project. Code and documentation are continuously updated. Please refer to the latest commits for the most current version.