import turtle
from turtle import *
feigton = turtle.Turtle()

feigton.shape("turtle")
feigton.speed(100)
feigton.tracer(100)
feigton.color("black")
feigton.width(2)
feigton.ht()

#The Feigenbaum constants needs a animal population, and a fertility.
#It dies when there are too many population, and they grows when there are alot
#of fertilities.

#x_1 will be 0.5(50% of maximum population which leads to 0<x<1)
x = None
#Lambda should be between 0 and 4(fertility of an animal but can overescape)
Lambda = None


def check(l):
    for s in range(len(l)/2,0,-1):
        for i in range(0,len(l)-(s*2)+1):
            a = [l[i+j] for j in range(s)]
            b = [l[i+j+s] for j in range(s)]
            if a == b:
                return a

def point(x,y):
    feigton.pu()
    feigton.goto(x,y)
    feigton.pd()
    feigton.fd(0.0001)


def CreateFeigenbaum(x,Lambda):
    Feigenbaumed_x = round(Lambda * x * (1 - x),3)
    return Feigenbaumed_x


def Feigenbaum(x,Lambda,Points):
    while check(Points) == None:
        Points.append(CreateFeigenbaum(x,Lambda))
        x = CreateFeigenbaum(x,Lambda)
    return check(Points)


def drawFeigenbaum(itr):     
    for i in range(itr+1):
        Lambda = (4.0/itr) * i
        for foodY in Feigenbaum(0.5,Lambda,[]):
            #point(Lambda*150-300,foodY*150)
            point(Lambda*350-1200,foodY*350-200)
        
        

        
drawFeigenbaum(3000)

turtle.done()

