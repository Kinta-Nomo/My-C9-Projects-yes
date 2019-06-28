import random
from theBall import Ball
from turtle import *
tom=Turtle()
tom.shape('circle')
tom.speed(0)
tom.tracer(100)
tom.ht()

def present(balls):
    # cleaning the screen
    tom.pd()
    tom.color(1,1,1)
    tom.width(1000)
    tom.goto(0,0)
    tom.fd(1)
    tom.pu()
    
    for ball in balls:
        tom.color(ball.color)
        tom.goto(ball.x,ball.y)
        tom.pd()
        tom.width(ball.r)
        tom.fd(1)
        tom.pu()

for i in range(10):
    Ball(m=random.randint(1,10),
         x=random.randint(-100,100),
         y=random.randint(-100,100))
    
print [ball.color for ball in Ball.balls]

for i in range(1000):
    for ball in Ball.balls:
        ball.move()
    present(Ball.balls)
    for j in range(10000):
        pass
