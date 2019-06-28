import turtle
from math import *
tom = turtle.Turtle()
tom.speed(0)
tom.width(10)
tom.ht()

def goto(x,y):
    tom.pu()
    tom.goto(x,y)
    tom.pd()
    
    
def circle(x,y,radius):
    heading = tom.heading()
    goto(x,y-radius)
    tom.setheading(0)
    tom.circle(radius)
    goto(x,y)
    tom.setheading(heading)
    
angle = 0
while True:
    #backgrounding
    tom.color("white")
    tom.width(10000)
    tom.fd(0.1)
    tom.width(5)
    
    tom.color("black")
    r1 = 100 #var
    x1,y1=0,0 #var
    
    circle(x1,y1,r1)
    
    r2 = r1/2.0 #var 
    angle += 0.1 #var
    rsum = r1 + r2 #var
    x2 , y2 = x1 + rsum * cos(angle) , y1 + rsum * sin(angle) #var
    
    circle(x2,y2,r2)