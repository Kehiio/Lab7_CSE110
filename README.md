# Lab 7 - Kelly Dempster

## Question 1: Automated Testing
I would put automated testing within a **Github action** that runs whenever code is pushed. That way when changes are made, there is a way to automatically check if the changes broke the current system or not. Also by hosting the testing on github, other people can see if the code is buggy, and can either help fix it or make sure not to build on top of it until its fixed. Since I was working on the project alone, having other people see if the code is buggy or not doesn't really matter, but having it test automatically when I commit can be helpful because I don't have to remember to run the tests manually. Some problems can arise though, like you may not want to run the tests every time you commit, such as if you were changing a comment in the code which would have no effect on the tests outcomes.

## Question 2: End to End testing for function output?
No, I would not use E2E testing to check the output of a specific function. This type of testing simulates how a user would use the website/program, from start to finish. This means theres many functions being tested at once, since we are testing the whole program. For testing the output of a specific function, **unit testing** would be more optimal.

## Question 3: Difference between navigation and snapshot mode
Snapshot mode looks at the page in its current state, while navigation loads the page then analizes. Snapshot is good for analyzing the page at a state which isn't seen upon load, like a checkout screen.

## Question 4: 3 Things to improve CSE 110 shop site (Lighthouse results)
1. HTML attribute doesn't have a "lang" value. Add a language to increase accessability.
2. SEO: Content doesn't have meta description. Lighthouse is suggesting to add a meta description to the page to allow it to be more easily searchable.
3. Mobile formatting. The buttons and images on mobile are very small and hard to read. The format should be different for mobile, maybe 1 item per row, and smaller margins.