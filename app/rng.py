from random import randint
#test
min_number = int(input("please enter the min number"))
max_number = int(input("Please enter the max number"))

if(max_number < min_number):
    print("invalid input --shutting down")
else:
    rnd_number = randint(min_number, max_number)
    print(rnd_number)