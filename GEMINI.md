# Antigravity AI Project Instructions: India Elder Care Services

## 🌐 Hosting Architecture & Auto-Deployment
This website is hosted via **GitHub Pages** connected to a custom domain on **Namecheap**:
- **GitHub Repository**: https://github.com/indiaeldercare/india-elder-care
- **Production Branch**: main
- **Live Custom Domain**: http://indiaeldercareservices.com (and https once SSL propagation completes)
- **Local Workspace**: C:\Users\Rajan. S Balaji\.gemini\antigravity\scratch\india-elder-care-services
- **Git Binary Path**: C:\Users\Rajan. S Balaji\AppData\Local\Programs\Git\cmd
- **GitHub CLI Path**: C:\Users\Rajan. S Balaji\AppData\Local\Programs\gh\bin

Any commit pushed to the main branch automatically triggers GitHub Pages to re-deploy and update the live website on indiaeldercareservices.com within 30–60 seconds.

---

## 🚨 MANDATORY DEFAULT BEHAVIOR FOR ALL FUTURE CONVERSATIONS

Whenever the user requests changes, updates, additions, or modifications to this website, the agent MUST strictly follow this exact 4-step workflow:

### Step 1: Implement & Validate Locally
- Make the requested code, text, style, or asset changes directly in the local workspace files (index.html, css/styles.css, js/app.js, etc.).
- Ensure all asset paths remain relative (css/styles.css, ssets/images/..., js/app.js).
- Never introduce absolute machine paths into website files.

### Step 2: Render & Provide Local Host Preview
- **ALWAYS** launch or provide a clickable local host rendering link to the user before doing anything else:
  👉 **[Preview Local Website (index.html)](file:///C:/Users/Rajan.%20S%20Balaji/.gemini/antigravity/scratch/india-elder-care-services/index.html)**
- Run Start-Process "C:\Users\Rajan. S Balaji\.gemini\antigravity\scratch\india-elder-care-services\index.html" so the user can immediately review the changes in their local browser.

### Step 3: Require User Approval BEFORE Pushing to Cloud
- **NEVER** push directly to GitHub without the user's explicit review and approval.
- Clearly summarize the local modifications made and explicitly ask:
  > *"Please review the local preview in your browser. Would you like me to deploy these changes live to indiaeldercareservices.com?"*

### Step 4: Auto-Deploy to Cloud Upon Approval
- As soon as the user approves (e.g., "yes", "looks good", "deploy", "push"), execute the deployment:
  `powershell
  $env:Path += ";C:\Users\Rajan. S Balaji\AppData\Local\Programs\Git\cmd;C:\Users\Rajan. S Balaji\AppData\Local\Programs\gh\bin"
  git add .
  git commit -m "<Clear, descriptive commit message>"
  git push origin main
  `
- Confirm that the changes were pushed to GitHub and provide the live site URL:
  👉 **[Live Website: indiaeldercareservices.com](http://indiaeldercareservices.com)**
