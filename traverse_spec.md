# Traverse Spec

On the left-hand side of the screen, there should be a dropdown menu listing all four screens.
Above the dropdown, it should show the current screen the user is on. This is read from the useState used for page navigation.

The user selects a target page from the dropdown and presses GO!

The app then performs a breadth-first search (BFS) on the page graph (see Graph Spec), starting from the current page, to determine the pages it must traverse through to reach the target page.

For now, it should just list out these pages.

When the user presses GO. The traverse component should build a function of multiple page navigations. There should be a slight setTimeOut before each page change, 
simulating how a user would navigate the application. 

Please do the traverseBuilder in a separate js file to the code is cleaner. 

## File structure
- This component should be in its own file, for cleaner code.
- The BFS logic should be in its own JS file, separate from the component.