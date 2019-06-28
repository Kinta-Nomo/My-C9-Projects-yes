import turtle
from turtle import *
from math import *
tom = turtle.Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(1)
tom.ht()
turtle.colormode(255)

tom.lt(90)
tom.pu()
tom.goto(0,-300)
tom.pd()

def generate(n,List,length,angle,tilt):
    newList=[]
    if n > 0:
        for Listitems in List:
            #F = forward + = right - = left [ = rememberPos ] = go backPos
            #F becomes FF+[+F-F-F]-[-F+F+F](easy to understand but what!)
            if Listitems == "F":
                newList.append("FF[++F-F-F][--F+F+F]")
            else:
                newList.append(Listitems)
        oneplace=""
        for i in newList:
            oneplace += i
        generate(n-1,oneplace,length,angle,tilt)
    elif n==0:
        positions=[]
        for letters in List:
            if letters == "F":
                tom.fd(length)
            elif letters == "+":
                tom.rt(angle)
            elif letters == "-":
                tom.lt(angle)
            elif letters == "[":
                length=length/1.5
                positions.append( [tom.position(),tom.heading()] )
                tom.rt(tilt)
            elif letters == "]":
                tom.pu()
                tom.goto(positions[-1][0][0],positions[-1][0][1])
                length=length*1.5
                tom.setheading(positions[-1][1])
                del positions[-1]
                tom.pd()
                
            
    
generate(6,["F"],8,25,20)
turtle.done()
