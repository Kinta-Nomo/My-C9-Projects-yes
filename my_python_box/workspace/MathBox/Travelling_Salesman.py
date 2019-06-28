import random
import turtle
from math import *
tom = turtle.Turtle()
tom.color("navy")
tom.speed(0)
tom.width(5)
tom.ht()

r = 9

points = []

for i in range(9):
    x = random.randint(-200,200)
    y = random.randint(-200,200)
    points.append((x,y))
    
print points

for point in points:
    tom.pu()
    tom.goto(point[0],point[1])
    tom.pd()
    tom.width(10)
    tom.fd(0.0001)
    tom.width(5)
    
def dist(a,b):
    return ((b[0]-a[0])**2+(b[1]-a[1])**2)**0.5
    
for i in range(len(points)-1):
    for j in range(i+1,len(points)):
        #print i,j,dist(points[i],points[j])
        pass

shortest = [None,1e100]

def pathFinder(n,path):
    global shortest
    if len(n) > 0:
        for i in range(len(n)):
            newpath = path[::]
            newpath.append(n[i])
            newn = n[::]
            del newn[i]
            pathFinder(newn,newpath)
    else:
        length = 0
        for i in range(len(path)-1):
            length += dist(path[i],path[i+1])
        #print path,length
        if shortest[1] > length:
            shortest = [path,length]
        #tom.pu()
        #tom.goto(path[0])
        #tom.pd()
        #for point in path:
        #    tom.goto(point[0],point[1])
        #tom.clear()

        
                           

pathFinder(points,[])
tom.pu()
tom.goto(shortest[0][0])
tom.pd()
for point in shortest[0]:
    tom.goto(point[0],point[1])
turtle.done()
    




###############################################################################################








import random
from math import *
import turtle
tom = turtle.Turtle()
tom.color("navy")


R = random.randint #creating R as we use random alot
def randomPoint(n):
    return [(R(-300,300),R(-300,300)) for i in range(n)] #create coordinate from -300 to 300 n times
#print randomPoint(5)

def distance(a,b):
     return ((a[0]-b[0])**2+(a[1]-b[1])**2)**0.5 #pythagorus theorem
#print distance((0,0),(100,100))

points = randomPoint(5)

def calculate(path):
    initial = (0,0) #start from coordinate 0,0
    totalDistance = 0 
    for p in path:
        totalDistance += distance(initial, p)
        initial = p
    return totalDistance
#print calculate(points) 

shortestPath = [None,1e100]

#get every conbinations including itself and ealking more than twice
for i in range(5):
    for j in range(5):
        for k in range(5):
            for r in range(5):
                for m in range(5):
                    #print i,j,k,r,m
                    if len(set([i,j,k,r,m]))==5: #check if it doesn't have same items
                        pathway = [points[i],points[j],points[k],points[r],points[m]]
                        
                        length = calculate(pathway)
                        
                        if length < shortestPath[1]:
                        	shortestPath = [[i,j,k,r,m],length]
                        
print shortestPath