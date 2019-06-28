from turtle import *
from math import *
import random
tom = Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(2.2)
tom.ht()
turtle.colormode(255)
tom.color(0,170,0)

x = 1
y = 1
matrix = None

while True:
    choice = round(random.randint(1,100))
    if choice == 1:
        nx = (0.00 * x) + (0.00 * y)
        ny = (0.00 * x) + (0.16 * y)
    elif 1 < choice <= 86:
        nx = (0.85 * x) + (0.04 * y) + 0.00
        ny = (-0.04 * x) + (0.85 * y) + 1.60
    elif 86 < choice <= 93:
        nx = (0.20 * x) + (-0.26 * y) + 0.00
        ny = (0.23 * x) + (0.22 * y) + 1.60
    elif 93 < choice:
        nx = (-0.15 * x) + (0.28 * y) + 0.00
        ny = (0.26 * x) + (0.24 * y) + 0.44
    x = nx
    y = ny
        
    tom.pu()
    tom.goto(x*50,y*50-200)
    tom.pd()
    tom.fd(0.01)
turtle.done()
