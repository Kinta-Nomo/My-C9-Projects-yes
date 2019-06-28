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

for i in range(6):
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
    dx = abs(b[0]-a[0])
    dy = abs(b[1]-a[1])
    
    d = sqrt(dx**2+dy**2)
    return d
    
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
    
