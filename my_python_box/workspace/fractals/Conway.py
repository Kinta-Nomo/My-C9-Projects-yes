from math import *

def checkConway(nums):
    newnums = []
    memory = None
    count = 1
    for i in range(len(nums)):
        number = nums[i]
        
        if i == len(nums)-1:
            if i == 0:
                newnums.append(1)
                newnums.append(number)
            elif number == memory:
                count+=1
                newnums.append(count)
                newnums.append(memory)
            else:
                newnums.append(count)
                newnums.append(memory)
                newnums.append(1)
                newnums.append(number)
        elif i == 0:
            pass
        elif number == memory:
            count+=1
        elif number != memory:
            newnums.append(count)
            newnums.append(memory)
            count = 1

        memory = number
    return newnums

def Conway(n,l,Lambda):
    nums = l
    for i in range(n):
        if Lambda:
            prevnums = checkConway(nums)
            if i+1 == 1:
                print i+1,"st generation:",float(len(prevnums))/len(nums)
            elif i+1 == 2:
                print i+1,"nd generation:",float(len(prevnums))/len(nums)
            elif i+1 == 3:
                print i+1,"rd generation:",float(len(prevnums))/len(nums)
            else:
                print i+1,"th generation:",float(len(prevnums))/len(nums)
            nums = checkConway(nums)
        else:
            if i+1 == 1:
                print i+1,"st generation:",nums
            elif i+1 == 2:
                print i+1,"nd generation:",nums
            elif i+1 == 3:
                print i+1,"rd generation:",nums
            else:
                print i+1,"th generation:",nums
            nums = checkConway(nums)

Conway(100,[1],True)
