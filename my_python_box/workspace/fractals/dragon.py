import turtle
from turtle import *
tom = turtle.Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(1)
tom.ht()
tom.color("black")

tom.pu()
tom.goto(0,0)
tom.pd()

tom.lt(90)

points=["R"]
newpoints=[]
length=1

for changes in range(7):
    for i in range(len(points)):
        if points[len(points)-1-i] == "R":
            newpoints.append("L")
        elif points[len(points)-1-i] == "L":
            newpoints.append("R")
    newpoints.append("R")
    for j in range(len(points)):
        newpoints.append(points[j])
    points=[]
    for t in range(len(newpoints)):
        points.append(newpoints[t])
    newpoints=[]
        
tom.fd(length)
for q in range(len(points)):
    if points[q] == "R":
        tom.rt(90)
        tom.fd(length)
    if points[q] == "L":
        tom.lt(90)
        tom.fd(length)
turtle.done()
  
