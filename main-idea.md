This is a portfolio and blogging website using static site generator.

This project will have the following criteria:

- Content of the website will be in /content folder
- In the /content folder, we will have /posts folder which holds blog posts in markdown format, there is also /pages folder which holds normal pages.
- The /template folder will hold the templates for this website in HTML format
- The /template forder will have the following files:
  - main.html for main overall layout
  - navigation.html for main menu
  - footer.html for botton footer
- The templating engine will use the following code snippet
  - {{ include:<filename> }} calls other template
  - {{ main_content }} calls the main content from posts or pages
- We will have a static file generator script in the/src folder
- The static site generator will generate the static files for the website into /public folder
- The static site generator will generate files from the /content folder and use the templates from the /template folder
- Make the frontend website using tailwind css and Shadcn component library
- Does not use any frontend javascript library