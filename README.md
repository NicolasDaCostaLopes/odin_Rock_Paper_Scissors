# odin_Rock_Paper_Scissors

This is a small project from [The Odin Project](https://www.theodinproject.com/) (TOP) curriculum

The idea is to make a game of rock papper scissors, only in the console for now, we'll get back to it later
to make a Graphical User Interface with buttons and text.

Most of the functions name and parameters were given to us, but we could make "helper" functions when we felt it was useful

as helper function i decided to make :
- getNumberOfRounds()
- isValidAnswer(answer)

also the input for the player selection had to not be case sensitive, so "RoCk" would be treated the same as "rOcK".


## After completion toughts
Using the pseudocode felt like a waste of time doing it, but it helped me get rid of most of the logic problem before implementation
And get a clearer idea of what i was trying to achieve with each function instead of also being torn with how i was going to implement it at the same time
I did what i think it would look like to pseudo code, didn't do any reasearch on how to do it properly but one thing i was missing was
the possible outputs of each of my functions in pseudocode
Let's say 

firstFunction(){
    let importantResult = secondFunction();
}

if secondFunction() could return : null, 1 or 10

my pseudoCode didn't let me easily see if i forgot to handdle a possible output of my secondFunction() in my firstFunction() so i did it step by step
it was ok here because it was relatively simple, but a thing to keep in mind in the future, as the complexity of my algorithms grow
i'm pretty sure i saw pseudocoe online that fixed the issue that i had by listing the possible results of a function at the end of it

Anyways, 👍 for pseudocode really helps out a lot for implementation ! :)