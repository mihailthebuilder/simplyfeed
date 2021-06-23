# SimplyFeed

Browser extension that filters liked and promoted posts in your LinkedIn feed. Available for download from the [Chrome Web Store](https://chrome.google.com/webstore/detail/simplyfeed-linkedin-feed/hpjgkdecioodgjhhdoagefbbdlljkpic) and [Firefox Browser Add-Ons](https://addons.mozilla.org/en-GB/firefox/addon/simplyfeed-linkedin-filter/).

# Table of contents

- [SimplyFeed](#simplyfeed)
- [Table of contents](#table-of-contents)
- [Features](#features)
- [Developing locally](#developing-locally)
- [Other](#other)

# Features

# Developing locally

Follow these steps if you want to

1. Run `npm install` (only the first time you create the extension locally).
2. Run `NODE_ENV=production npm run build` to create the build files.
3. Go to `background.html` in the newly-created `build` folder (red boxes). Change the `src` value of the first `<script>` to the name of the file highlighted in the yellow box. (This file contains the Google Analytics code and, for some reason, I couldn't get it to work well with the webpack setup. I didn't spend too much time either, felt it wasn't worth the effort.)
   [Google Analytics code rename](readme/ga_rename.png)

# Other

mention tests
