import random

tom = Turtle()
tom.shape('turtle')
tom.speed(100)
tom.color('green')

p1=(10,20)
p2=(200,-200)

def getAngel(p1,p2):
    d=(p2[0]-p1[0],p2[1]-p1[1])
    return math.atan(d[1]/float(d[0]))/math.pi*180
def getDistance(p1,p2):
    d=(p2[0]-p1[0],p2[1]-p1[1])
    return (d[0]**2+d[1]**2)**0.5


d=(p2[0]-p1[0],p2[1]-p1[1])


tom.pu()
tom.goto(p1)
tom.pd()
tom.goto(p2)

tom.setheading(0)
tom.pu()
tom.goto(p1)
tom.color('red')
tom.pd()
tom.fd(d[0])
tom.lt(90)
tom.fd(d[1])


tom.setheading(0)
tom.pu()
tom.goto(p1)
tom.color('yellow')
tom.pd()
import math

tom.left(getAngel(p1,p2))
tom.fd(getDistance(p1,p2))