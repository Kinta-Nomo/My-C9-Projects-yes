import turtle
from turtle import *
tom = turtle.Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(1)
tom.ht()
tom.color("black")

tom.pu()
tom.goto(0,-300)
tom.pd()
　　　
tom.lt(90)
def fractaltree(length,n,degree):
    tom.fd(length)
    if n > 0:
        tp=tom.position()
        ta=tom.heading()
        
        tom.rt(degree/2.0)
        fractaltree(length/1.8,n-1,degree)
        
        tom.goto(tp[0],tp[1])
        tom.setheading(ta+degree/2.0)
        fractaltree(length/1.8,n-1,degree)
        tom.goto(tp[0],tp[1])

fractaltree(200,15,45)
turtle.done()
