cck2127
HW1
October 4, 2018

Marvel Comics API SEARCH

How to Run
***********

In terminal, simply go into this project directory and type "open index.html".

There aren't any extra dependencies to download.

Open in the browser of your choice: some styling is slightly different between
Chrome and Safari, but functionality is the same. Chrome preferred.

Formatting only works in large desktop dimensions, not on mobile or tablet.

To view on github: https://github.com/carsonkraft/Part_2

Design
*******

This project was exciting for me because Marvel has such bold design. I started
by copying as closely as I could the styling of their own website. All of the colors
are the same and the logo and favicon. Unfortunately most of their fonts
are expensive so I got the next best options. Imagining that this is a tool
on the Marvel website, I wanted to create as consistent design as possible.

I then thought about what the search form would look like. I made a decision that
people would use this site to look up specific comics. I wanted to make a minimalist
page, so I hid the other options in "Advanced". Adding "Advanced" for some reason
also indicated to the use that not all the options are required-- something I was
having trouble make clear. Then, I made the defaults "Any ..." so people would be
sure. At first, the year option was typed in by the user, but then I realized if they
made an error my whole program would crash. It's definitely more user friendly
with a dropdown that goes down to 1939, the year Marvel was created. Inputs remain
in the form after a search, so people remember what their query was. Advanced options
also stay open if used.

When I looked at the site, pretending I was a fist time user, I realized people
might be a little confused on what it does and what to do. That's why I added the
"About" dropdown, which gives a little context on what this is, but doesn't add
too much more text to the screen when not clicked.

For the results, I wanted to make sure people had some idea of how many pages they
could go through, which is why I added the number of results discreetly in the
corner (copying Google's format). If this assignment didn't have a specific number
of how many results had to appear on the page, I would have made it 9. I think
multiples of 3 are much more pleasing to the eye, as you can see, the last result
looks really odd alone at the end. I personally think it's worth it to have the
rest in three rows for optimal sizing.

When there isn't a character or no photo, instead, there's a silhouette of a superhero.
The images are centered when there is no character description, to make sure there
isn't any awkward space. If I had had more time, I would have figured out how to
shorten the load time.

Overall, I enjoyed this assignment, and I think the application ended up being
very user-friendly and beautiful!
