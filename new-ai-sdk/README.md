# README

# Fix lighting css issue when running `npm run dev` on android-termux because tailwind 4 uses lightningcss

- Src: [Click here](https://github.com/tailwindlabs/tailwindcss/discussions/15999)
- Another reddit (from same person): [Click here](https://www.reddit.com/r/termux/comments/1gmf5a0/node_module_lightningcss1280/)

Upstream of lightningcss: [Click here](https://github.com/parcel-bundler/lightningcss/releases)

- On macos I ran: ` npm install lightningcss.android-arm64.node --save-optional`
- (optionally, no need though) On termux: I install dependency `npm install --save-dev lightningcss.android-arm64.node`.
