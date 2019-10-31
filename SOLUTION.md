# Next Steps #

1. Use a more secure method for authenticating with the Github API. While using environment variables keeps the API key off Github, it is still exposed in the Network tab when running the code in the browser.
2. Tests! Since this was only supposed to take a few hours, I did not write any unit tests.
3. Design: I chose a simple, clean layout, but it is certainly without frills. For production, I would definitely work on "making it pop" a lot more.
4. Currently, all CSS is located in one `index.css` file. Given that a production app would be much larger, I would split out the css into separate files by component (plus a universal file for things like `.bold`) and ideally use a library like SASS or LESS for composition and more features.
5. One potential additional feature would be to highlight the search term in the results (which also may necessitate selectively showing other fields in the result list since it does not just query the repo name).

#### Browser Compatibility ####
- This was designed and built in Chrome for Mac.
- All features function correctly on Firefox and Safari. However, the look of some native browser items, such as the search box and pagination buttons look a bit different.
  - Most notably, the hover color change on the pagination buttons doesn't work the same in either browser. In Firefox and Safari, the disabled buttons show a color change on hover (but shouldn't). Additionally, in Safari, active buttons _don't_ change color on hover.
- I was unable to test in Internet Explorer, however I imagine that as-is, the app would not function. Due to the use of modern (ES6+) JavaScript features, I would need to install babel and/or polyfill libraries to compile the code down to older JS.
- In addition to the JS incompatibilities, once the app is up and running there would be some style/layout differences as well. For instance, CSS Flexbox is buggy in IE10+ and fully incompatible with earlier IE versions, so it is likely that the layout would not display properly.