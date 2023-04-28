Think about what algorithm we should use to get to the correct answer in as few
steps as possible. We could just try every single possible point until we get to
the answer, but can we do better?

We can use a something called _Binary Search_. Basically, we want to use the
arrow directions to narrow down the search space. for example, if the arrow
directions are pointing up and right, we know that the target is in the top
right quadrant. We can then put our next guess in the middle of that quadrant
effectively cutting our search space by 1/4. We can keep doing this, until we
get close enough to the target. This is the optimal solution to this game.

Extension question:

-   Let's say this game is played on a N x N square grid. What is the minimum
    number of guesses required in the worst case? (i.e. assuming you get as
    unlucky as possible?)
-   What are the conditions necessary for binary search to work?

Feel free to approach us if you'd like to find out more!
