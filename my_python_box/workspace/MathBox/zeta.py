
from math import *
import turtle
tom = turtle.Turtle()
tom.speed(0)
tom.tracer(100)
tom.ht()

def point(x,y,c,w):
    tom.color(c)
    tom.width(w)
    tom.pu()
    tom.goto(x,y)
    tom.pd()
    tom.fd(0.01)

def Zeta(s,st):
    if s.real > 1:
        #point(s.real*100,float(str(s.imag).split("j")[0])*100,"blue",2)
        i = 1
        n = 0 + 0j
        memory = 1 + 0j 
        while abs(memory.real - n.real) > 0.00001:
            memory = n
            n+=1.0/(i**(s))
            #tom.goto(n.real*100,float(str(n.imag).split("j")[0])*100)
            #print n.real,float(str(n.imag).split("j")[0])
            i +=1
            if n.real > 5:
                #exceed
                return "exceed"
        if st:
            point((n.real-((n.real-1)*2))*100,float(str(n.imag).split("j")[0])*100,"red",5)
        else:
            point(n.real*100,float(str(n.imag).split("j")[0])*100,"red",5)
            return n
    else:
        Zeta((1+(1-s.real))+(s.imag*1j),True)


blocks = 100
for i in range(-blocks/2,blocks/2):
    for j in range(-blocks/2,blocks/2):
        Zeta((6.0/blocks*i) + (6.0/blocks*j * 1j),False)
    

turtle.done()

#for i in range(-2000,2000):
#    Zeta((1.0/2.0) + (i/10.0)*1j,False)
