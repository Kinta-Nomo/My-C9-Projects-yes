import turtle
from turtle import *
from math import *
import random
tom = turtle.Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(0.01)
turtle.colormode(255)
tom.ht()

def triangle(tlength,fill):
    if fill:
        tom.color(random.randint(0,255),random.randint(0,255),random.randint(0,255))
        tom.begin_fill()
        for i in range(3):
            tom.fd(tlength)
            tom.lt(360/3.0)
        tom.end_fill()
    else:
        for i in range(3):
            tom.fd(tlength)
            tom.lt(360/3.0)
                
def sierpinski(x,y,length,n,nend):
    if n < nend:
        tom.pu()
        tom.goto(x,y)
        tom.pd()
        triangle(length,False)
        sierpinski(x,y,length/2,n+1,nend)
        sierpinski(x+length/2.0,y,length/2.0,n+1,nend)
        sierpinski(x+length/4.0,  y + sqrt((length/2)**2 - (length/4)**2)  ,length/2.0,n+1,nend)

    elif n == nend:
        tom.pu()
        tom.goto(x,y)
        tom.pd()
        triangle(length,True)


sierpinski(-300,-300,600,0,8)

turtle.done()



####################################################################################################################################################################################################################

import turtle
from turtle import *
import random
tom = turtle.Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(1)
tom.ht()

tom.pu()
tom.goto(0,-300)
tom.pd()

tom.lt(90)
def fractaltree(length,n,degree):
    tom.color("black")
    tom.fd(length)
    if n > 0:
        tp=tom.position()
        ta=tom.heading()
        
        tom.rt(degree/3.0)
        fractaltree(length/2.0,n-1,degree)
        
        tom.goto(tp[0],tp[1])
        tom.setheading(ta)
        fractaltree(length/2.0,n-1,degree)
        
        tom.goto(tp[0],tp[1])
        tom.setheading(ta+degree/3.0)
        fractaltree(length/2.0,n-1,degree)
        tom.goto(tp[0],tp[1])

fractaltree(200,10,360)
turtle.done()

#####################################################################################################################################################################################################################

import turtle
from turtle import *
import random

tom = Turtle()
tom.shape('turtle')
tom.tracer(100)
tom.color('green')
tom.width(0.1)

def draw(n):
    for i in range (n):
        t = random.randint(1,6)
        tx,ty=tom.position()
        if 1<=t<=2:
            tom.pu()
            tom.goto((tx+0)/2,(ty+200)/2)
            tom.pd()
            tom.fd(0.1)
        elif 3<=t<=4:
            tom.pu()
            tom.goto((tx+(-200))/2,(ty+(-200))/2)
            tom.pd()
            tom.fd(0.1)
        else:
            tom.pu()
            tom.goto((tx+200)/2,(ty+(-200))/2)
            tom.pd()
            tom.fd(0.1)
            
            
draw(20000)



