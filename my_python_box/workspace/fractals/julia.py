import turtle
from turtle import *
from math import *
tom = turtle.Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(4)
tom.ht()
turtle.colormode(255)

xgrid=200
ygrid=200
calci=0
calcj=0



color=(255,0,0)
colors=[]
colorstate = 0
for i in range(2000):
    if colorstate == 0:
        color=(255,color[1]+15,0)
        if color[1] >= 255:
            colorstate = 1
        
    elif colorstate == 1:
        color=(color[0]-15,255,0)
        if color[0]==0:
            colorstate = 2
        
    elif colorstate == 2:
        color=(0,255,color[2]+15)
        if color[2]==255:
            colorstate = 3
        
    elif colorstate == 3:
        color=(0,color[1]-15,255)
        if color[1]==0:
            colorstate = 4
        
    elif colorstate == 4:
        color=(color[0]+15,0,255)
        if color[0]==255:
            colorstate = 5
        
    elif colorstate == 5:
        color=(255,0,color[2]-15)
        if color[2]==0:
            colorstate = 0
    colors.append(color)
        
#0=255,^,0 1=v,255,0 2=0,255,^ 3=0,v,255 4=^,0,255 5=255,0,v




def calculate(z,c,n,nend):
    if n >= nend:
        #when iterate finishes and still less than 2
        return "black"
    else:
        if abs(z) >= 2:
            return colors[n]
        #favourite part!
        zplusone=(z**2) + c
        return calculate(zplusone,c,n+1,nend)

for i in range(-xgrid/2,xgrid/2):
    calci = i*(4.0/xgrid)
    for j in range(-xgrid/2,xgrid/2):
        calcj = (j*(4.0/xgrid))*1j
        #change only this 
        tom.color(calculate(calci+calcj,-0.79+0.15j,0,100))

        tom.pu()
        tom.goto(calci*100,(float(str(calcj.imag).split("j")[0]))*100)
        tom.pd()
        tom.fd(0.001)


turtle.done()
